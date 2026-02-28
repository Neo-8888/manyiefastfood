const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const year = document.getElementById("year");
const modal = document.getElementById("orderModal");
const modalClose = document.querySelector(".modal-close");
const modalItemText = document.getElementById("modalItemText");
const modalOrderLink = document.getElementById("modalOrderLink");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
}

const orderButtons = document.querySelectorAll(".order-btn");

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

if (orderButtons.length && modal && modalItemText && modalOrderLink) {
  orderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-item") || "Kota";
      const message = `Hi Manyiie Fast Food, I want to order: ${itemName}`;
      modalItemText.textContent = `Selected item: ${itemName}`;
      modalOrderLink.setAttribute("href", `https://wa.me/27699744994?text=${encodeURIComponent(message)}`);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
