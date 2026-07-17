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

const people = {
  marianela: {
    name: "Marianela",
    role: "Fotografía y comunicación institucional",
    copy: "Mira cada proyecto con sensibilidad, atención al detalle y cercanía. Desde la fotografía y la comunicación institucional, transforma historias cotidianas en mensajes claros, humanos y con identidad propia.",
  },
  lina: {
    name: "Lina",
    role: "Estrategia digital, publicaciones y métricas",
    copy: "Ordena las ideas y las convierte en estrategias digitales posibles. Piensa contenidos, calendarios y métricas para que cada publicación tenga un propósito y ayude a tomar mejores decisiones.",
  },
  yesi: {
    name: "Yesi",
    role: "Video, narrativa audiovisual y reels",
    copy: "Encuentra historias en los gestos, los lugares y las voces. A través del video, los reels y la narrativa audiovisual, crea contenidos dinámicos que acercan a cada organización con su comunidad.",
  },
};

const personModal = document.querySelector("[data-person-modal]");
const personTriggers = document.querySelectorAll("[data-person]");
const personCloseButtons = document.querySelectorAll("[data-person-close]");
const personName = document.querySelector("[data-person-name]");
const personRole = document.querySelector("[data-person-role]");
const personCopy = document.querySelector("[data-person-copy]");
let activePersonTrigger = null;

const closePersonModal = () => {
  if (!personModal || personModal.hidden) return;
  personModal.hidden = true;
  document.body.classList.remove("has-person-modal");
  activePersonTrigger?.focus();
};

personTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const person = people[trigger.dataset.person];
    if (!person || !personModal) return;
    activePersonTrigger = trigger;
    personName.textContent = person.name;
    personRole.textContent = person.role;
    personCopy.textContent = person.copy;
    personModal.hidden = false;
    document.body.classList.add("has-person-modal");
    personModal.querySelector(".person-close")?.focus();
  });
});

personCloseButtons.forEach((button) => button.addEventListener("click", closePersonModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePersonModal();
});


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
