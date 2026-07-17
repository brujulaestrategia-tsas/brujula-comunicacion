const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const revealItems = document.querySelectorAll(".reveal");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-label", "Abrir menu");
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
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));


const proposalLinks = document.querySelectorAll("[data-proposal]");
const messageField = document.querySelector('textarea[name="mensaje"]');

proposalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const proposal = link.dataset.proposal;
    if (messageField && !messageField.value.trim()) {
      messageField.value = `Hola, me interesa conocer la propuesta de comunicación para ${proposal}.`;
    }
    window.setTimeout(() => messageField?.focus({ preventScroll: true }), 450);
  });
});

