const canvas = document.querySelector("canvas");

canvas.setAttribute("width", 500);
canvas.setAttribute("height", 500);

const context = canvas.getContext("2d");

const onDraw = () => {

    context.fillStyle = Math.random() > 0.5 ? "green" : "red";
    context.fillRect(0, 0, 100, 100);

    requestAnimationFrame(onDraw);
};

onDraw();