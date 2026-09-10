document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ------------------------------------------------------------
  // Page navigation
  // ------------------------------------------------------------
  const pageOrder = [
    "page-welcome",
    "page-message",
    "page-reasons",
    "page-loveyou",
    "page-timeline",
    "page-distance",
    "page-wishes",
    "page-letter",
    "page-final",
  ];

  const pages = pageOrder.map((id) => document.getElementById(id));
  const pageCount = document.getElementById("pageCount");
  let currentIndex = 0;

  const goToPage = (targetId) => {
    const index = pageOrder.indexOf(targetId);
    if (index === -1 || index === currentIndex) return;

    pages[currentIndex].classList.remove("active");
    pages[index].classList.add("active");

    currentIndex = index;
    if (pageCount) pageCount.textContent = `${index + 1} / ${pageOrder.length}`;

    pages[index].scrollTop = 0;
  };

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => goToPage(button.dataset.next));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && currentIndex < pageOrder.length - 1) {
      goToPage(pageOrder[currentIndex + 1]);
    } else if (event.key === "ArrowLeft" && currentIndex > 0) {
      goToPage(pageOrder[currentIndex - 1]);
    }
  });

  // ------------------------------------------------------------
  // Typewriter effect for the hero subtitle
  // ------------------------------------------------------------
  const heroSub = document.getElementById("heroSub");
  const heroSubText = "For the girl who makes ordinary moments feel like memories.";

  if (heroSub) {
    if (prefersReducedMotion) {
      heroSub.textContent = heroSubText;
    } else {
      let i = 0;
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.textContent = "\u00A0";

      const typeNext = () => {
        if (i < heroSubText.length) {
          heroSub.textContent = heroSubText.slice(0, i + 1);
          heroSub.appendChild(cursor);
          i += 1;
          setTimeout(typeNext, 28);
        } else {
          setTimeout(() => cursor.remove(), 1600);
        }
      };

      setTimeout(typeNext, 900);
    }
  }

  // ------------------------------------------------------------
  // Ambient hearts drifting up across the page
  // ------------------------------------------------------------
  const ambientLayer = document.getElementById("ambientHearts");

  if (ambientLayer && !prefersReducedMotion) {
    const spawnAmbientHeart = () => {
      const heart = document.createElement("span");
      heart.className = "ambient-heart";
      heart.textContent = "\u2665";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      heart.style.fontSize = `${10 + Math.random() * 14}px`;
      heart.style.animationDuration = `${9 + Math.random() * 6}s`;
      ambientLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 16000);
    };

    for (let i = 0; i < 4; i += 1) {
      setTimeout(spawnAmbientHeart, i * 1500);
    }
    setInterval(spawnAmbientHeart, 2600);
  }

  // ------------------------------------------------------------
  // Soft heart trail that follows the cursor
  // ------------------------------------------------------------
  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    let lastTrailTime = 0;

    const spawnTrailHeart = (x, y) => {
      const now = Date.now();
      if (now - lastTrailTime < 90) return;
      lastTrailTime = now;

      const heart = document.createElement("span");
      heart.className = "trail-heart";
      heart.textContent = "\u2665";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 900);
    };

    window.addEventListener("mousemove", (event) => {
      spawnTrailHeart(event.clientX, event.clientY);
    });
  }

  // ------------------------------------------------------------
  // Wax-sealed love letter, with a heart burst on open
  // ------------------------------------------------------------
  const envelope = document.getElementById("envelope");
  const hint = document.getElementById("envelopeHint");

  const burstHearts = () => {
    if (prefersReducedMotion || !envelope) return;

    for (let i = 0; i < 10; i += 1) {
      const heart = document.createElement("span");
      heart.className = "burst-heart";
      heart.textContent = "\u2665";
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
      const distance = 60 + Math.random() * 70;
      heart.style.setProperty("--bx", `${Math.cos(angle) * distance}px`);
      heart.style.setProperty("--by", `${Math.sin(angle) * distance - 20}px`);
      heart.style.animationDelay = `${Math.random() * 0.15}s`;
      envelope.appendChild(heart);
      setTimeout(() => heart.remove(), 1400);
    }
  };

  if (envelope) {
    const toggleLetter = () => {
      const isOpen = envelope.classList.toggle("open");

      envelope.setAttribute("aria-expanded", String(isOpen));

      if (hint) {
        hint.textContent = isOpen
          ? "Your letter is open \u2764\uFE0F"
          : "Tap the seal to open your letter";
      }

      if (isOpen) burstHearts();
    };

    envelope.addEventListener("click", toggleLetter);

    envelope.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleLetter();
      }
    });
  }
});
