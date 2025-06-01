document.addEventListener("DOMContentLoaded", function () {
  // Espera o tempo da animação e remove a tela de introdução
  setTimeout(function () {
    const intro = document.getElementById('intro');
    if (intro) intro.style.display = 'none';
  }, 4000); // 4 segundos
});

const services = [
  {
    title: "Análise/Melhorias de Perfil",
    img: "logo.png",
    text: "Aprimore sua imagem no Instagram.",
    wpp: "https://wa.me/5527998638625?text=Olá,%20estou%20vindo%20através%20do%20Instagram%20e%20gostaria%20de%20informações%20sobre%20seu%20serviço%20de%20*Analise%20e%20melhorias%20de%20perfil*"
  },
  {
    title: "Captação de Conteúdo",
    img: "logo.png",
    text: "Fotos e vídeos para redes sociais.",
    wpp: "https://wa.me/5527998638625?text=Olá,%20estou%20vindo%20através%20do%20Instagram%20e%20gostaria%20de%20informações%20sobre%20seu%20serviço%20de%20*Conteúdos%20Digitais*"
  },
  {
    title: "Identidade Visual",
    img: "logo.png",
    text: "Design e branding profissional.",
    wpp: "https://wa.me/5527998638625?text=Olá,%20estou%20vindo%20através%20do%20Instagram%20e%20gostaria%20de%20informações%20sobre%20seus%20pacotes%20de%20*Identidade%20Visual*"
  },
  {
    title: "Gestão de Redes Sociais",
    img: "logo.png",
    text: "Gerenciamento de conteúdo e estratégia.",
    wpp: "https://wa.me/5527998638625?text=Olá,%20estou%20vindo%20através%20do%20Instagram%20e%20gostaria%20de%20informações%20sobre%20seu%20serviço%20de%20*Gestão%20de%20Redes%20Sociais*"
  },
  {
    title: "Planejamento Estratégico",
    img: "logo.png",
    text: "Defina metas e ações com foco.",
    wpp: "https://wa.me/5527998638625?text=Olá,%20estou%20vindo%20através%20do%20Instagram%20e%20gostaria%20de%20informações%20sobre%20seu%20serviço%20de%20*Planejamento%20Estratégico*"
  }
];

const carousel = document.querySelector(".story-carousel");
const pagination = document.querySelector(".pagination");

const cardsPerPage = 3;
const cardWidth = 240;
const gap = 16;
const scrollStep = (cardWidth + gap) * cardsPerPage;

function buildCarousel() {
  carousel.innerHTML = "";
  services.forEach(service => {
    const card = document.createElement("a");
    card.href = service.wpp;
    card.className = "card";
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
      <img src="${service.img}" alt="${service.title}">
      <h3>${service.title}</h3>
      <p>${service.text}</p>
    `;
    carousel.appendChild(card);
  });
}
buildCarousel();

const totalPages = Math.ceil(services.length / cardsPerPage);

function buildPagination() {
  pagination.innerHTML = "";
  for(let i = 0; i < totalPages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    if(i === 0) dot.classList.add("active");
    dot.style.width = "14px";        // bolinha tamanho fixo
    dot.style.height = "14px";
    dot.style.borderRadius = "50%";  // bolinha redonda
    dot.style.backgroundColor = i === 0 ? "#007bff" : "#bbb";
    dot.style.margin = "0 6px";
    dot.style.cursor = "pointer";

    dot.addEventListener("click", () => {
      goToPage(i);
    });
    pagination.appendChild(dot);
  }
}
buildPagination();

function goToPage(pageIndex) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const scrollPos = pageIndex * scrollStep;
  carousel.scrollTo({ left: Math.min(scrollPos, maxScrollLeft), behavior: "smooth" });
  updateActiveDot(pageIndex);
}

function updateActiveDot(activeIndex) {
  const dots = pagination.querySelectorAll(".pagination-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
    dot.style.backgroundColor = i === activeIndex ? "#007bff" : "#bbb";
  });
}

carousel.addEventListener("scroll", () => {
  const scrollLeft = carousel.scrollLeft;
  const currentPage = Math.round(scrollLeft / scrollStep);
  updateActiveDot(currentPage);
});

// Navegação esquerda/direita - cuidado para ter esses elementos no HTML com as classes .nav.left e .nav.right

document.querySelector(".nav.left").addEventListener("click", () => {
  const currentPage = Math.round(carousel.scrollLeft / scrollStep);
  if (currentPage > 0) {
    goToPage(currentPage - 1);
  }
});

document.querySelector(".nav.right").addEventListener("click", () => {
  const currentPage = Math.round(carousel.scrollLeft / scrollStep);
  if (currentPage < totalPages - 1) {
    goToPage(currentPage + 1);
  }
});

// Drag and swipe

let isDragging = false;
let startX;
let scrollStart;

carousel.addEventListener("mousedown", e => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX - carousel.offsetLeft;
  scrollStart = carousel.scrollLeft;
  e.preventDefault();
});

carousel.addEventListener("touchstart", e => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollStart = carousel.scrollLeft;
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    carousel.classList.remove("dragging");
  }
});

window.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    carousel.classList.remove("dragging");
  }
});

carousel.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const x = e.pageX - carousel.offsetLeft;
  const walk = (startX - x);
  carousel.scrollLeft = scrollStart + walk;
});

carousel.addEventListener("touchmove", e => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (startX - x);
  carousel.scrollLeft = scrollStart + walk;
});
