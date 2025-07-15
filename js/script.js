const cards = document.querySelectorAll(
  ".Colombo, .Kandy, .Anuradhapura, .Badulla, .Gampaha, .Jaffna"
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // classes com efeito forte
    const strongEffect = ["Anuradhapura", "Badulla", "Gampaha", "Jaffna"];

    // pega a classe principal (ex: 'Badulla')
    const className = Array.from(card.classList).find((c) =>
      strongEffect.includes(c)
    );

    // rotação mais forte nas cartas específicas
    const divisor = className ? 6 : 12;

    const rotateX = -(y - centerY) / divisor;
    const rotateY = (x - centerX) / divisor;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
