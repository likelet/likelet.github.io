(() => {
  "use strict";

  const TAU = 2 * Math.PI;

  // A fixed seed makes a figure identical across languages and screen sizes.
  function seededRandom(seed) {
    return () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function ellipse(ctx, x, y, rx, ry, angle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, angle, 0, TAU);
    ctx.fill();
  }

  function line(ctx, points, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    ctx.bezierCurveTo(...points.slice(2));
    ctx.stroke();
  }

  // Smooth closed outline through the midpoints of an irregular ring of anchors.
  function contour(x, y, rx, ry, phase, roughness) {
    const points = [];
    const n = 34;
    for (let i = 0; i < n; i++) {
      const angle = TAU * i / n;
      const radius = 1 + roughness * (
        0.1 * Math.sin(3 * angle + phase) + 0.07 * Math.cos(5 * angle - phase)
        + 0.034 * Math.sin(9 * angle - phase)
      );
      points.push([x + rx * radius * Math.cos(angle), y + ry * radius * Math.sin(angle)]);
    }
    const path = new Path2D();
    for (let i = 0; i < n; i++) {
      const prev = points[(i + n - 1) % n];
      const here = points[i];
      const next = points[(i + 1) % n];
      if (!i) path.moveTo((prev[0] + here[0]) / 2, (prev[1] + here[1]) / 2);
      path.quadraticCurveTo(here[0], here[1], (here[0] + next[0]) / 2, (here[1] + next[1]) / 2);
    }
    path.closePath();
    return path;
  }

  // Keep the half-plane closer to a cell's nucleus than to its neighbor.
  function cutCell(vertices, nucleus, neighbor) {
    const dx = neighbor.x - nucleus.x;
    const dy = neighbor.y - nucleus.y;
    const mx = (neighbor.x + nucleus.x) / 2;
    const my = (neighbor.y + nucleus.y) / 2;
    const cut = [];
    let prev = vertices[vertices.length - 1];
    let prevSide = (prev.x - mx) * dx + (prev.y - my) * dy;
    for (const point of vertices) {
      const side = (point.x - mx) * dx + (point.y - my) * dy;
      if ((side <= 0) !== (prevSide <= 0)) {
        const fraction = prevSide / (prevSide - side);
        cut.push({ x: prev.x + (point.x - prev.x) * fraction, y: prev.y + (point.y - prev.y) * fraction });
      }
      if (side <= 0) cut.push(point);
      prev = point;
      prevSide = side;
    }
    return cut;
  }

  function tumorIsland(ctx, rng, x, y, rx, ry, spacing, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    const path = contour(0, 0, rx, ry, rng() * TAU, 1);
    ctx.strokeStyle = "#faf3dd";
    ctx.lineWidth = 10;
    ctx.stroke(path);
    ctx.strokeStyle = "#bd9182";
    ctx.lineWidth = 2.6;
    ctx.stroke(path);
    ctx.fillStyle = "#efd2b7";
    ctx.fill(path);
    ctx.clip(path);

    const sites = [];
    const xm = 1.3 * rx + spacing;
    const ym = 1.3 * ry + spacing;
    let row = 0;
    for (let cy = -ym; cy < ym + spacing; cy += spacing * 0.87, row++) {
      for (let cx = -xm; cx < xm + spacing; cx += spacing) {
        sites.push({
          x: cx + (row % 2 ? 0.5 * spacing : 0) + (rng() - 0.5) * spacing * 0.65,
          y: cy + (rng() - 0.5) * spacing * 0.66
        });
      }
    }
    const cells = ["#e4a995", "#f3c7aa", "#e8b08e", "#edb7a1", "#d99e8b", "#eec4aa", "#eaa395"];
    for (const p of sites) {
      if (Math.abs(p.x) > rx * 1.25 + spacing || Math.abs(p.y) > ry * 1.25 + spacing) continue;
      const d = spacing * 1.6;
      let polygon = [
        { x:p.x-d, y:p.y-d }, { x:p.x+d, y:p.y-d },
        { x:p.x+d, y:p.y+d }, { x:p.x-d, y:p.y+d }
      ];
      for (const q of sites) {
        if (p === q || Math.abs(q.x - p.x) > d * 1.65 || Math.abs(q.y - p.y) > d * 1.65) continue;
        polygon = cutCell(polygon, p, q);
      }
      ctx.beginPath();
      polygon.forEach((v, i) => i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y));
      ctx.closePath();
      ctx.fillStyle = cells[Math.floor(rng() * cells.length)];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,241,219,.77)";
      ctx.lineWidth = 1.15;
      ctx.stroke();
      const a = rng() * TAU, nx = p.x + (rng()-0.5)*2.2, ny = p.y + (rng()-0.5)*2.2;
      ellipse(ctx, nx, ny, spacing * .28, spacing * .21, a, "#a3636a");
      ellipse(ctx, nx - .8, ny + .6, spacing * .21, spacing * .13, a, "#b87978");
      ellipse(ctx, nx + 1.2, ny - .5, spacing * .075, spacing * .058, a, "#874f60");
      ellipse(ctx, nx - 1.6, ny - 1.5, .65, .65, a, "#e7baa0");
    }
    ctx.restore();
  }

  function immuneCell(ctx, rng, x, y, r) {
    const angle = rng() * TAU;
    ellipse(ctx, x, y, r+1.3, r+1, angle, "#f4efe0");
    ellipse(ctx, x, y, r, r * .94, angle, "#659e91");
    ellipse(ctx, x-.2, y+.1, r*.68, r*.63, angle, "#215f5b");
    ellipse(ctx, x+r*.12, y-r*.17, r*.45, r*.31, angle, "#457c73");
    ellipse(ctx, x-r*.16, y+r*.22, r*.13, r*.10, angle, "#204e4b");
    ellipse(ctx, x-r*.3, y-r*.34, r*.12, r*.09, angle, "#aac8b7");
  }

  function fibers(ctx, rng, w, h, amount) {
    const colors = ["rgba(73,125,127,.25)", "rgba(136,155,145,.37)", "rgba(255,255,245,.65)", "rgba(87,135,139,.34)"];
    for (let i = 0; i < amount; i++) {
      const x = rng() * (w+180) - 120, y = rng() * (h+40)-20;
      const bend = Math.sin(x / 115 + y / 99) * 22;
      const stem = 28 + 145 * rng();
      line(ctx,[x,y, x+stem*.24,y+bend-9, x+stem*.7,y+bend+14, x+stem,y-7+bend],
        colors[Math.floor(rng()*colors.length)], .6+rng()*2.1);
      if (i % 7 === 0) ellipse(ctx,x+stem*.5,y+bend+1,5.8,1.3,bend/65,"rgba(72,112,113,.48)");
    }
  }

  function paper(ctx, rng, w, h, colors) {
    const wash = ctx.createLinearGradient(0, 0, w, h);
    wash.addColorStop(0, colors[0]);
    wash.addColorStop(.57, colors[1]);
    wash.addColorStop(1, colors[2]);
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, w, h);
    for (let i=0; i<1650; i++) {
      const radius=.35+rng()*.85;
      ellipse(ctx,rng()*w,rng()*h,radius,radius*.72,rng()*TAU,"rgba(89,101,77,.10)");
    }
  }

  function tissue(ctx, w, h) {
    const rng = seededRandom(4189);
    paper(ctx,rng,w,h,["#dbe8dc","#f0edda","#c6d9ce"]);
    fibers(ctx,rng,w,h,440);
    // Stromal channels and immune infiltrates surround the tumor islands.
    for(let i=0;i<195;i++) immuneCell(ctx,rng,rng()*w,rng()*h,2.3+rng()*3.7);
    tumorIsland(ctx,rng,58,55,127,65,15,-.37);
    tumorIsland(ctx,rng,293,-30,125,98,15,.35);
    tumorIsland(ctx,rng,506,114,133,80,17,.27);
    tumorIsland(ctx,rng,772,38,98,89,15,.14);
    tumorIsland(ctx,rng,235,225,143,85,18,-.55);
    tumorIsland(ctx,rng,30,322,76,78,15,-.5);
    tumorIsland(ctx,rng,482,376,142,88,19,-.45);
    tumorIsland(ctx,rng,761,305,107,74,16,.25);
    tumorIsland(ctx,rng,184,496,123,64,16,.22);
  }

  function ecotypes(ctx,w,h) {
    const rng=seededRandom(110);
    paper(ctx,rng,w,h,["#f1ddca","#f2e3cc","#e3cfb7"]);
    fibers(ctx,rng,w,h,300);
    for(let i=0;i<165;i++) immuneCell(ctx,rng,rng()*w,rng()*h,2.7+rng()*3.8);
    const glands=[
      [23,57,92,57,-.62],[181,-25,115,67,.13],[345,62,96,59,-.55],
      [548,7,91,62,.41],[704,115,88,62,-.24],[117,231,126,74,-.33],
      [361,257,95,61,.44],[533,190,107,52,-.62],[693,324,75,72,.1]
    ];
    for (const [x,y,rx,ry,rotation] of glands) {
      tumorIsland(ctx,rng,x,y,rx,ry,13,rotation);
      ctx.save(); ctx.translate(x,y); ctx.rotate(rotation);
      const lumen=contour(0,0,rx*.48,ry*.39,rng()*TAU,1.54);
      ctx.fillStyle="#f7eddd"; ctx.fill(lumen);
      ctx.lineWidth=2.5; ctx.strokeStyle="#edbeaa"; ctx.stroke(lumen);
      ctx.restore();
    }
  }

  function ecdna(ctx,w,h) {
    const rng=seededRandom(93);
    paper(ctx,rng,w,h,["#e4ebe4","#edf0df","#d9e5da"]);
    const drawRing=(x,y,rx,ry,rotation,phase) => {
      ctx.save(); ctx.translate(x,y); ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0,0,rx,ry,0,0,TAU);
      ctx.strokeStyle="#afc2ad";ctx.lineWidth=1;ctx.stroke();
      const colors=["#44847e","#7ca998","#dfad89","#cd8c77","#48877f","#99b6a6"];
      for(let i=0;i<48;i++) {
        const a=TAU*i/48, b=TAU*(i+.91)/48;
        const offset=5.5*Math.sin(8*a+phase);
        const offsetEnd=5.5*Math.sin(8*b+phase);
        for (const strand of [-1,1]) {
          ctx.beginPath();
          ctx.moveTo((rx+strand*offset)*Math.cos(a),(ry+strand*offset)*Math.sin(a));
          ctx.lineTo((rx+strand*offsetEnd)*Math.cos(b),(ry+strand*offsetEnd)*Math.sin(b));
          ctx.strokeStyle=colors[(Math.floor(i/5)+(strand===1?0:1))%colors.length];
          ctx.lineWidth=4;ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo((rx-offset)*Math.cos(a),(ry-offset)*Math.sin(a));
        ctx.lineTo((rx+offset)*Math.cos(a),(ry+offset)*Math.sin(a));
        ctx.strokeStyle="#9db29d";ctx.lineWidth=1;ctx.stroke();
      }
      ctx.restore();
    };
    drawRing(173,145,107,77,-.36,.8);
    drawRing(197,142,66,39,.26,1.5);
    // Two flanking reference segments and short alignment reads. Conceptual only.
    const start=349,end=635;
    for (let i=0;i<6;i++) {
      const y=82+i*24;
      ctx.fillStyle="rgba(93,128,116,.12)";ctx.fillRect(start,y,end-start,1);
      let x=start+Math.floor(12*rng());
      while(x<end-8) {
        const len=Math.min(end-x,16+Math.floor(rng()*42));
        const coral=x>438&&x<525;
        ctx.fillStyle=coral?(i%2?"#c48e76":"#d9a889"):(i%2?"#66998e":"#88ac9b");
        ctx.fillRect(x,y-3.2,len,6.4);
        if(len>22) {
          ctx.fillStyle="rgba(247,245,223,.85)";
          ctx.fillRect(x+len*.61,y-3.2,1.4,6.4);
        }
        x+=len+3+Math.floor(rng()*9);
      }
    }
    for(const [a,b,c] of [[372,484,"#70a291"],[439,553,"#c08e77"],[488,610,"#79a49b"]]){
      line(ctx,[a,74,a+13,33,b-11,33,b,74],c,1.25);
    }
  }

  const figures = {tissue:[740,460,tissue], ecotypes:[680,290,ecotypes], ecdna:[680,290,ecdna]};
  const painted = new WeakMap();
  window.drawQiArt = (root=document) => {
    const nodes = root.matches?.("canvas[data-art]") ? [root] : root.querySelectorAll("canvas[data-art]");
    for(const canvas of nodes) {
      const figure=figures[canvas.dataset.art];
      if(!figure) continue;
      const [w,h,draw]=figure;
      const ratio=Math.min(2,Math.max(1,window.devicePixelRatio||1));
      const version=canvas.dataset.art+ratio;
      if(painted.get(canvas)===version) continue;
      canvas.width=Math.round(w*ratio);
      canvas.height=Math.round(h*ratio);
      const ctx=canvas.getContext("2d");
      if(!ctx) continue;
      ctx.setTransform(ratio,0,0,ratio,0,0);
      ctx.lineCap="round"; ctx.lineJoin="round";
      draw(ctx,w,h);
      painted.set(canvas,version);
    }
  };
})();
