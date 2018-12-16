const canvas = document.querySelector("canvas");

canvas.setAttribute("width", 500);
canvas.setAttribute("height", 500);

const context = canvas.getContext("2d");

const gradientMap = {};

const gradient = ([x, y]) => {
    const key = `${x}${y}`;
    if (!gradientMap[key]) {

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

const noise2d = (x, y) => {

    const ix = parseInt(x);
    const iy = parseInt(y);
    const sample = [x, y];

    const cTL = [ix + 0, iy + 0];
    const cTR = [ix + 1, iy + 0];
    const cBL = [ix + 0, iy + 1];
    const cBR = [ix + 1, iy + 1];

    const gTL = normalize(gradient(cTL));
    const gTR = normalize(gradient(cTR));
    const gBL = normalize(gradient(cBL));
    const gBR = normalize(gradient(cBR));

    const vTL = normalize(sub(sample, cTL));
    const vTR = normalize(sub(sample, cTR));
    const vBL = normalize(sub(sample, cBL));
    const vBR = normalize(sub(sample, cBR));

    const dTL = dot(gTL, vTL);
    const dTR = dot(gTR, vTR);
    const dBL = dot(gBL, vBL);
    const dBR = dot(gBR, vBR);

    const avgT = (dTL + dTR) * 0.5;
    const avgB = (dBL + dBR) * 0.5;
    const avg = (avgT + avgB) * 0.5;
    const value = avg * 255;

    context.fillStyle = `rgb(${value},${value},${value})`;
    context.fillRect(x * 100, y * 100, 1, 1);
};

const onDraw = () => {

    for (var i = 0; i < 300; i++) {
        for (var j = 0; j < 300; j++) {

            const x = i / 100;
            const y = j / 100;

            context.fillStyle = noise2d(x, y);
            //   context.fillRect(i, j, 1, 1);
        }
    }

    //   requestAnimationFrame(onDraw);
};

onDraw();