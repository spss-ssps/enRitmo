const c = document.getElementById("thread");
const ctx = c.getContext("2d");
let w, h;
function resize() {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let pts = Array.from({ length: 10 }, () => ({ x: w / 2, y: h / 2 }));
let mouse = { x: w / 2, y: h / 2 };

addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function loop() {
    ctx.clearRect(0, 0, w, h);
    pts[0].x += (mouse.x - pts[0].x) * 0.2;
    pts[0].y += (mouse.y - pts[0].y) * 0.2;

    for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.3;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.3;
    }

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.stroke();

    requestAnimationFrame(loop);
}
loop();