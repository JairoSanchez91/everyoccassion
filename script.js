// Número de WhatsApp en formato internacional, solo dígitos (ej. 52 + 10 dígitos).
// DATO PENDIENTE: mientras siga siendo "___", los botones de WhatsApp abren Instagram.
const WHATSAPP_NUMBER = "___";

const hasWhatsApp = /^\d{10,15}$/.test(WHATSAPP_NUMBER);

// También la usa catalogo.js para los botones que crea.
window.applyWhatsAppLinks = (root = document) => {
  if (!hasWhatsApp) return;
  root.querySelectorAll("[data-wa-text]").forEach((link) => {
    const text = encodeURIComponent(link.dataset.waText);
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  });
};

window.applyWhatsAppLinks();

if (!hasWhatsApp) {
  console.warn("Every Occasion: falta el número de WhatsApp en script.js; los botones apuntan a Instagram.");
}

// Botón fijo de pedido en móvil: se oculta mientras los botones principales están a la vista.
const stickyOrder = document.querySelector(".sticky-order");
const primaryActions = document.querySelectorAll(".hero-actions");

if (stickyOrder && "IntersectionObserver" in window) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    stickyOrder.classList.toggle("is-hidden", visible.size > 0);
  });
  primaryActions.forEach((el) => observer.observe(el));
}

// Aparición suave de tarjetas y pasos al entrar en pantalla.
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 70}ms`;
    revealObserver.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}
