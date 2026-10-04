document.addEventListener("DOMContentLoaded", () => {
  // 1. Мобилдик меню үчүн гамбургер баскычын кошуу
  const navContainer = document.querySelector(".nav");
  const nav = document.querySelector("nav");

  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("menu-toggle");
  toggleBtn.innerHTML = "☰";
  toggleBtn.setAttribute("aria-label", "Менюну ачуу");
  navContainer.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggleBtn.innerHTML = nav.classList.contains("open") ? "✕" : "☰";
  });

  // Менюдагы шилтемени чыкылдатканда мобилдик менюну жабуу
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggleBtn.innerHTML = "☰";
    });
  });

  // 2. Скролл жасаганда активдүү меню шилтемесин белгилөө (Active Nav Highlight)
  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(`nav a[href*="${sectionId}"]`);

      if (navLink) { // эгер шилтеме табылса
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);

  // 3. Элементтер скроллдоп түшкөндө жумшак пайда болуу эффекти (Scroll Reveal Animation)
  const cardsAndSections = document.querySelectorAll(".card, .step, .quote");

  cardsAndSections.forEach((el) => el.classList.add("reveal"));

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    cardsAndSections.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Баракча жүктөлгөндө биринчи экрандагыларды көрсөтүү

  // 4. Сандардын анимациясы (Статистикалык сандар көтөрүлүп чыгат)
  const stats = document.querySelectorAll(".stat b");
  let animated = false;

  function animateStats() {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
      stats.forEach((stat) => {
        const textValue = stat.innerText;
        const targetValue = parseInt(textValue.replace(/\D/g, ""));
        const suffix = textValue.replace(/[0-9]/g, "");

        if (!isNaN(targetValue)) {
          let count = 0;
          const speed = Math.ceil(targetValue / 40);

          const updateCount = () => {
            count += speed;
            if (count < targetValue) {
              stat.innerText = count + suffix;
              setTimeout(updateCount, 30);
            } else {
              stat.innerText = targetValue + suffix;
            }
          };
          updateCount();
        }
      });
      animated = true;
    }
  }

  window.addEventListener("scroll", animateStats);
});