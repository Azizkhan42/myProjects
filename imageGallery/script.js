// Basic gallery logic
const gallery = document.getElementById("gallery");
const cards = Array.from(document.querySelectorAll(".gallery .card"));
const filters = document.getElementById("filters");

filters.addEventListener("click", (e) => {
  if (!e.target.matches(".btn")) return;
  const cat = e.target.dataset.cat;
  // toggle active
  document
    .querySelectorAll(".filters .btn")
    .forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");

  cards.forEach((card) => {
    if (cat === "all" || card.dataset.category === cat) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let currentIndex = -1;

function openLightbox(index) {
  const visibleCards = cards.filter((c) => c.style.display !== "none");
  if (index < 0) index = 0;
  if (index >= visibleCards.length) index = visibleCards.length - 1;
  const card = visibleCards[index];
  const img = card.querySelector("img");
  lbImage.src = img.src;
  lbImage.alt = img.alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  currentIndex = index;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImage.src = "";
  currentIndex = -1;
}

function showNext(dir) {
  const visibleCards = cards.filter((c) => c.style.display !== "none");
  if (visibleCards.length === 0) return;
  currentIndex =
    (currentIndex + dir + visibleCards.length) % visibleCards.length;
  const img = visibleCards[currentIndex].querySelector("img");
  lbImage.src = img.src;
  lbImage.alt = img.alt;
}

// Click card to open
gallery.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  // compute index among visible
  const visibleCards = cards.filter((c) => c.style.display !== "none");
  const idx = visibleCards.indexOf(card);
  openLightbox(idx);
});

lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
lbPrev.addEventListener("click", () => showNext(-1));
lbNext.addEventListener("click", () => showNext(1));

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("open")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showNext(-1);
    if (e.key === "ArrowRight") showNext(1);
  }
});

// Simple image filters (apply to gallery container via classes)
const applyGray = document.getElementById("applyGray");
const applySepia = document.getElementById("applySepia");
const applyBright = document.getElementById("applyBright");
const clearFilters = document.getElementById("clearFilters");

applyGray.addEventListener("click", () => {
  gallery.classList.remove("filter-sepia", "filter-bright");
  gallery.classList.add("filter-grayscale");
});
applySepia.addEventListener("click", () => {
  gallery.classList.remove("filter-grayscale", "filter-bright");
  gallery.classList.add("filter-sepia");
});
applyBright.addEventListener("click", () => {
  gallery.classList.remove("filter-grayscale", "filter-sepia");
  gallery.classList.add("filter-bright");
});
clearFilters.addEventListener("click", () => {
  gallery.classList.remove("filter-grayscale", "filter-sepia", "filter-bright");
});
