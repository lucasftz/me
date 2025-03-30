import { ui, createSignal, createEffect } from "./nui/index.js"

class Point {
  constructor({ initialX, initialY, direction }) {
    this.x = initialX;
    this.y = initialY;
    this.direction = direction;
  }

  update({ mouseX, mouseY }) {
    const radians = (this.direction * Math.PI) / 180;
    this.x += Math.cos(radians);
    this.y += Math.sin(radians);

    // bounce off walls
    if (this.x <= 0 || this.x >= window.innerWidth) {
      this.direction = 180 - this.direction;
    }
    if (this.y <= 0 || this.y >= window.innerHeight) {
      this.direction = 360 - this.direction;
    }

    // cursor "gravity"
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxEffectDistance = 200;

    if (distance < maxEffectDistance) {
      const angleToCursor = Math.atan2(dy, dx) * (180 / Math.PI);
      const attractionStrength = 0.1 * (distance / maxEffectDistance);

      this.direction = this.linear_interp(this.direction, angleToCursor, attractionStrength);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#7a9ffd";
    ctx.fill();
  }

  linear_interp(a, b, t) {
    return a + (b - a) * t;
  }
}

function App() {
  const canvas = createSignal();
  const points = createSignal([]);

  createEffect(() => {
    const ctx = canvas.get()?.getContext("2d");

    if (!ctx) {
      return;
    }

    const nPoints = 100;
    for (let n = 0; n < nPoints; n++) {
      points.update((old) => [...old, new Point({
        initialX: Math.floor(Math.random() * (window.innerWidth + 1)),
        initialY: Math.floor(Math.random() * (window.innerHeight + 1)),
        direction: Math.floor(Math.random() * (360 + 1)),
      })])
    }

    const mousePos = { mouseX: 0, mouseY: 0 };
    addEventListener("mousemove", (e) => {
      mousePos.mouseX = e.clientX;
      mousePos.mouseY = e.clientY;
    })

    function animate() {
      ctx.clearRect(0, 0, canvas.get()?.width, canvas.get()?.height);

      for (const point of points.get()) {
        // TODO:
        point.update(mousePos);
        point.draw(ctx);
      }

      requestAnimationFrame(animate);
    }

    animate();
  })

  return ui.div({ class: "flex justify-center items-center min-h-screen" },
    ui.canvas({ bind: canvas, id: "background", width: window.innerWidth, height: window.innerHeight, class: "fixed top-0 left-0 -z-10" }, "Your browser does not support the canvas element."),
    ui.div({ class: "flex justify-center items-center min-h-screen" },
      ui.div({ class: "grid md:grid-cols-5 px-12 lg:px-34 gap-24 items-center" },
        ui.div({ class: "flex flex-col gap-4 col-span-2" },
          ui.h1({ class: "text-5xl text-[#dedcff] ubuntu-800" }, "Lucas Fietkiewicz"),
          ui.p({ class: "text-[#d8d8d8] ubuntu-300" }, "I like optimization and figuring out what makes things tick."),
        ),

        ui.p({ class: "text-[#433bff] col-span-3 ubuntu-500" },
          "I'm a frontend developer with experience on the teams at ",
          ui.a({ href: "https://get.even.biz/", target: "_blank", class: "text-[#3d73ff] underline italic" }, "even"),
          " and ",
          ui.a({ href: "https://www.reikit.com/", target: "_blank", class: "text-[#3d73ff] underline italic" }, "REI/kit"),
          ", where I led projects like migrating to new backends and optimizing packages. One of my proudest contributions was developing a build step that verifies API responses, completely eliminating a class of errors with zero added client-side code. Outside of work, I enjoy studying low-level programming and performance tuning. For example, I've built ",
          ui.a({ href: "https://github.com/lucasftz/zdom", trget: "_blank", class: "text-[#3d73ff] underline italic" }, "WASM bindings for Zig"),
          ", making it easy to integrate with the web. I also created a lightweight ",
          ui.a({ href: "https://github.com/lucasftz/nui", target: "_blank", class: "text-[#3d73ff] underline italic" }, "UI library"),
          ", which this site is written in. You can check out my resume ",
          ui.a({ href: "public/resume.pdf", download: "Resume - Lucas", class: "text-[#3d73ff] underline italic" }, "here"),
          " and my github ",
          ui.a({ href: "https://github.com/lucasftz", target: "_blank", class: "text-[#3d73ff] underline italic" }, "here"),
          ".",
        )
      )
    )
  )
}

window.onload = function() {
  const root = document.getElementById("root")
  root.appendChild(App())
}
