const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const revealItems = document.querySelectorAll(".reveal");
const navToggleLabel = navToggle.querySelector(".sr-only");

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

function closeNav() {
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Ouvrir le menu");
  navToggleLabel.textContent = "Ouvrir le menu";
}

function openNav() {
  nav.classList.add("is-open");
  document.body.classList.add("nav-open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Fermer le menu");
  navToggleLabel.textContent = "Fermer le menu";
}

navToggle.addEventListener("click", () => {
  if (nav.classList.contains("is-open")) {
    closeNav();
  } else {
    openNav();
  }
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    closeNav();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
