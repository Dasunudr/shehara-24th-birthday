import confetti from "canvas-confetti";

export const triggerBirthdayConfetti = () => {
  // Firework burst 1 - Center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#D4AF37", "#F7CAD0", "#E07A5F", "#FAF7F2", "#FFD700", "#FF69B4"],
    ticks: 300,
    gravity: 0.8,
    scalar: 1.2,
    shapes: ["circle", "square"],
  });

  // Star and heart burst left
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ["#FFD700", "#FFB6C1", "#E68B9E", "#FFF8F0"],
    });
  }, 200);

  // Star and heart burst right
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ["#FFD700", "#FFB6C1", "#E68B9E", "#FFF8F0"],
    });
  }, 400);

  // Gentle floating star shower
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.2 },
      colors: ["#FAF7F2", "#F7CAD0", "#D4AF37"],
      gravity: 0.4,
      scalar: 0.9,
    });
  }, 700);
};

export const triggerHeartBurst = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x, y },
    colors: ["#E68B9E", "#D9627B", "#F7CAD0", "#FFD700"],
    ticks: 200,
    gravity: 0.9,
    scalar: 1.1,
  });
};
