// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1000);
});

// animacja hero
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 10 + 5 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 20 + 20 + "s";
    particlesContainer.appendChild(particle);
  }
}
createParticles();

// Header Scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  nav.classList.toggle("active");
});

// Smooth scroll w nawigacji
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Reveal animacja
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

// animacja licznik
const counters = document.querySelectorAll(".stat-number");
const speed = 200;
let counted = false;

function startCounting() {
  if (counted) return;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText =
          target + (counter.getAttribute("data-target") === "100" ? "%" : "+");
      }
    };
    updateCount();
  });
  counted = true;
}

// Start counting when stats section is visible
window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight * 0.75) {
      startCounting();
    }
  }
});

// Form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const button = this.querySelector(".form-button");
  const originalText = button.textContent;
  button.textContent = "Wysyłanie...";
  button.style.background = "var(--gradient)";

  setTimeout(() => {
    button.textContent = "Wysłano! ✓";
    button.style.background = "#10B981";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "white";
      this.reset();
    }, 2000);
  }, 1500);
});

// stopka rok
document.getElementById("year").textContent = new Date().getFullYear();

// Parallax effect for hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Mouse move effect for service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// Add typing effect to hero title
const heroTitle = document.querySelector(".hero-content h1");
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  setTimeout(typeWriter, 1500);
}

// NOWOŚĆ: Logika dla przycisku "Powrót na górę"
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});