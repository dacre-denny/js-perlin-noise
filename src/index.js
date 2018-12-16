const canvas = document.querySelector("canvas");

canvas.setAttribute("width", 500);
canvas.setAttribute("height", 500);

const context = canvas.getContext("2d");

const gradientMap = {};

const gradient = (x, y) => {
    const key = `${x}${y}`;
    if (!gradientMap[key]) {

        const g = [Math.random(), Math.random()].map(d => d * 2 - 1);

        const s = 1 / Math.sqrt(Math.pow(g[0], 2) + Math.pow(g[1], 2));

        gradientMap[key] = g.map(d => d * s);
    }
    return gradientMap[key];
};

const noise2d = (x, y) => {

    const ix = parseInt(x);
    const iy = parseInt(y);

    const fx = x - ix;
    const fy = y - iy;


    if (fx === 0 && fy === 0) {

        const g = gradient(ix, iy);
        //console.log("x" + x, "y" + y);
        context.beginPath();
        context.moveTo(x * 100, y * 100);
        context.lineTo(x * 100 + g[0] * 10, y * 100 + g[1] * 10);
        context.stroke();
    }
    if (fx === 0) {
        // context.fillStyle = "white";
        // context.fillRect(i * 100, j * 100, 1, 1);
    }
    if (fy === 0) {
        // context.fillStyle = "white";
        // context.fillRect(i * 100, j * 100, 1, 1);
    }

    // context.fillStyle = "blue";
    // context.fillRect(i * 100, j * 100, 1, 1);
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