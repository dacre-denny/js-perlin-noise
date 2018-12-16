const canvas = document.querySelector("canvas");

canvas.setAttribute("width", 500);
canvas.setAttribute("height", 500);

const context = canvas.getContext("2d");

const noise2d = (x, y) => {

    const ix = parseInt(x);
    const iy = parseInt(y);

    const fx = x - ix;
    const fy = y - iy;

    if (fx === 0 && fy === 0) {
        return "red";
    }
    if (fx === 0) {
        return "white";
    }
    if (fy === 0) {
        return "white";
    }

    return "blue";
};

const onDraw = () => {

    for (var i = 0; i < 500; i++) {
        for (var j = 0; j < 500; j++) {

            const x = 5 * i / 500;
            const y = 5 * j / 500;

            context.fillStyle = noise2d(x, y);
            context.fillRect(i, j, 1, 1);
        }
    }

    requestAnimationFrame(onDraw);
};

onDraw();