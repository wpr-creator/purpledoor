const scene = document.querySelector(".scene-stage");

if (scene && window.matchMedia("(pointer:fine)").matches) {
  scene.addEventListener("pointermove", (event) => {
    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.setProperty("--mouse-x", x.toFixed(3));
    scene.style.setProperty("--mouse-y", y.toFixed(3));

    document.querySelectorAll(".planet").forEach((planet, index) => {
      const depth = index === 0 ? 8 : 5;
      planet.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}
