const cards = document.querySelectorAll(
  ".Colombo, .Kandy, .Anuradhapura, .Badulla, .Gampaha, .Jaffna"
);

cards.forEach((card) => {
  let targetRotateX = 0;
  let targetRotateY = 0;
  let targetTranslateZ = 0;

  let currentRotateX = 0;
  let currentRotateY = 0;
  let currentTranslateZ = 0;

  const lerp = (start, end, t) => start + (end - start) * t;

  const rect = card.getBoundingClientRect();

  const zoneWidth = rect.width * 0.6;
  const zoneHeight = rect.height * 0.6;
  const zoneLeft = (rect.width - zoneWidth) / 2;
  const zoneTop = (rect.height - zoneHeight) / 2;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const strongEffect = ["Anuradhapura", "Badulla", "Gampaha", "Jaffna"];
  const className = Array.from(card.classList).find((c) =>
    strongEffect.includes(c)
  );
  const divisor = className ? 4 : 12;
  const maxTranslateZ = 30;

  function update() {
    currentRotateX = lerp(currentRotateX, targetRotateX, 0.1);
    currentRotateY = lerp(currentRotateY, targetRotateY, 0.1);
    currentTranslateZ = lerp(currentTranslateZ, targetTranslateZ, 0.1);

    card.style.transform = `rotateX(${currentRotateX.toFixed(
      2
    )}deg) rotateY(${currentRotateY.toFixed(
      2
    )}deg) translateZ(${currentTranslateZ.toFixed(2)}px)`;

    requestAnimationFrame(update);
  }

  update();

  card.addEventListener("mousemove", (e) => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - centerY) / divisor;
    const rotateY = (x - centerX) / divisor;

    const insideZone =
      x >= zoneLeft &&
      x <= zoneLeft + zoneWidth &&
      y >= zoneTop &&
      y <= zoneTop + zoneHeight;

    let translateZ = 0;
    if (insideZone) {
      const distX = Math.abs(x - centerX);
      const distY = Math.abs(y - centerY);
      const maxDist = Math.sqrt((zoneWidth / 2) ** 2 + (zoneHeight / 2) ** 2);
      const dist = Math.sqrt(distX ** 2 + distY ** 2);

      translateZ = maxTranslateZ * (1 - dist / maxDist);
      translateZ = Math.max(10, translateZ);
    }

    targetRotateX = rotateX;
    targetRotateY = rotateY;
    targetTranslateZ = translateZ;
  });

  card.addEventListener("mouseleave", () => {
    targetRotateX = 0;
    targetRotateY = 0;
    targetTranslateZ = 0;
  });
});
