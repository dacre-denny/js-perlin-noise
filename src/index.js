const canvas = document.querySelector("canvas");

canvas.setAttribute("width", 500);
canvas.setAttribute("height", 500);

const context = canvas.getContext("2d");

const gradientMap = {};

const gradient = ([x, y]) => {
    const key = `${parseInt(x)}, ${parseInt(y)}`;
    if (!gradientMap[key]) {

        //const g = [Math.sin((x + 2) * 1.7), Math.cos((y + 3) * 5.7)];
        const g = [Math.random(), Math.random()].map(d => d * 2 - 1);

        gradientMap[key] = g;
    }

    return gradientMap[key];
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

const noise2d = (x, y) => {

    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const sample = [x, y];

    const cTL = [ix + 0, iy + 0];
    const cTR = [ix + 1, iy + 0];
    const cBL = [ix + 0, iy + 1];
    const cBR = [ix + 1, iy + 1];

    const gTL = normalize(gradient(cTL));
    const gTR = normalize(gradient(cTR));
    const gBL = normalize(gradient(cBL));
    const gBR = normalize(gradient(cBR));

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

    context.fillStyle = `rgb(${value},${value},${value})`;
    context.fillRect(x * 100, y * 100, 1, 1);
};

const onDraw = () => {

    for (var i = 0; i < 500; i++) {
        for (var j = 0; j < 500; j++) {

            const x = i / 100;
            const y = j / 100;

            context.fillStyle = noise2d(x, y);
            //   context.fillRect(i, j, 1, 1);
        }
    }

    //   requestAnimationFrame(onDraw);
};

onDraw();

console.log(gradientMap);

// noise2d(0.1, 0.1);
// noise2d(1.1, 0.1);