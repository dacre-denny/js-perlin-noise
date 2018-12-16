const canvas = document.querySelector("canvas");

canvas.setAttribute("width", 500);
canvas.setAttribute("height", 500);

const context = canvas.getContext("2d");

const gradientMap = {};

const gradient = ([x, y], phase) => {

    const frac = phase - parseInt(phase);
    const phaseKey0 = parseInt(phase) % 5;
    const phaseKey1 = parseInt(phase + 1) % 5;

    const key0 = `${parseInt(x)}, ${parseInt(y)}, ${phaseKey0}`;
    const key1 = `${parseInt(x)}, ${parseInt(y)}, ${phaseKey1}`;

    if (!gradientMap[key0]) {
        const g = [Math.random(), Math.random()].map(d => d * 2 - 1);
        gradientMap[key0] = g;
    }

    if (!gradientMap[key1]) {
        const g = [Math.random(), Math.random()].map(d => d * 2 - 1);
        gradientMap[key1] = g;
    }

    return [
        lerp(gradientMap[key0][0], gradientMap[key1][0], frac),
        lerp(gradientMap[key0][1], gradientMap[key1][1], frac),
        lerp(gradientMap[key0][2], gradientMap[key1][2], frac)
    ];
};

const lerp = (a, b, s) => {

    return (b - a) * s + a;
};

const normalize = (v) => {

    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);

    return [v[0] / len, v[1] / len];
};

const dot = (v0, v1) => {

    return v0[0] * v1[0] + v0[1] * v1[1];
};

const sub = (v0, v1) => {

    return [v0[0] - v1[0], v0[1] - v1[1]];
};

const ease = (x, x0) => {

    return 3.0 * Math.pow(x - x0, 2.0) - 2.0 * Math.pow(x - x0, 3.0);
};

const noise2d = (x, y, phase = 0) => {

    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const sample = [x, y];

    const cTL = [ix + 0, iy + 0];
    const cTR = [ix + 1, iy + 0];
    const cBL = [ix + 0, iy + 1];
    const cBR = [ix + 1, iy + 1];

    const gTL = normalize(gradient(cTL, phase));
    const gTR = normalize(gradient(cTR, phase));
    const gBL = normalize(gradient(cBL, phase));
    const gBR = normalize(gradient(cBR, phase));

    const vTL = sub(sample, cTL);
    const vTR = sub(sample, cTR);
    const vBL = sub(sample, cBL);
    const vBR = sub(sample, cBR);

    const dTL = dot(gTL, vTL);
    const dTR = dot(gTR, vTR);
    const dBL = dot(gBL, vBL);
    const dBR = dot(gBR, vBR);

    const sx = ease(x, ix + 0);
    const sy = ease(y, iy + 0);
    const a = dTL + sx * (dTR - dTL);
    const b = dBL + sx * (dBR - dBL);
    const avg = a + sy * (b - a);

    const value = (avg * 0.5 + 0.5) * 255;

    return value;
};

let t = 0;

const onDraw = () => {

    for (var i = 0; i < 200; i++) {
        for (var j = 0; j < 200; j++) {

            const x = i / 100;
            const y = j / 100;
            const value = noise2d(x, y, t);

            context.fillStyle = `rgb(${value},${value},${value})`;
            context.fillRect(x * 100, y * 100, 1, 1);
        }
    }

    requestAnimationFrame(onDraw);
    t += 0.1;
};

onDraw();