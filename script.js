document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const intro = document.getElementById('intro');
    if (intro) intro.style.display = 'none';
  }, 4000);
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
const navLeft = document.querySelector(".nav.left");
const navRight = document.querySelector(".nav.right");

const cardWidth = 240;
const gap = 16;

let cardsPerPage;
let scrollStep;
let totalPages;

function isMobile() {
  return window.innerWidth <= 600; // breakpoint celular
}

function setupCarousel() {
  cardsPerPage = isMobile() ? 1 : 3;
  scrollStep = (cardWidth + gap) * cardsPerPage;
  totalPages = isMobile() ? services.length : Math.ceil(services.length / cardsPerPage);

  buildCarousel();
  buildPagination();
  goToPage(0);
  updateNavButtons(0);
}

function buildCarousel() {
  carousel.innerHTML = "";
  services.forEach(service => {
    const card = document.createElement("a");
    card.href = service.wpp;
    card.className = "card";
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.style.minWidth = cardWidth + "px"; // fixar largura do card
    card.style.marginRight = gap + "px";
    card.innerHTML = `
      <img src="${service.img}" alt="${service.title}">
      <h3>${service.title}</h3>
      <p>${service.text}</p>
    `;
    carousel.appendChild(card);
  });
}

function buildPagination() {
  pagination.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    dot.style.width = "14px";
    dot.style.height = "14px";
    dot.style.borderRadius = "50%";
    dot.style.backgroundColor = i === 0 ? "#007bff" : "#bbb";
    dot.style.margin = "0 6px";
    dot.style.cursor = "pointer";

    dot.addEventListener("click", () => {
      goToPage(i);
    });

    pagination.appendChild(dot);
  }
}

function goToPage(pageIndex) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const scrollPos = pageIndex * scrollStep;
  carousel.scrollTo({ left: Math.min(scrollPos, maxScrollLeft), behavior: "smooth" });
  updateActiveDot(pageIndex);
  updateNavButtons(pageIndex);
}

function updateActiveDot(activeIndex) {
  const dots = pagination.querySelectorAll(".pagination-dot");
  dots.forEach((dot, i) => {
    dot.style.backgroundColor = i === activeIndex ? "#007bff" : "#bbb";
  });
}

function updateNavButtons(currentPage) {
  navLeft.disabled = currentPage === 0;
  navRight.disabled = currentPage === totalPages - 1;
}

// DESABILITAR SWIPE E SCROLL MANUAL NO CELULAR
function disableManualScrollOnMobile() {
  if (isMobile()) {
    carousel.style.overflowX = "hidden"; // bloqueia scroll manual
  } else {
    carousel.style.overflowX = "auto"; // libera scroll
  }
}

// EVENTOS DAS SETAS
navLeft.addEventListener("click", () => {
  const currentPage = Math.round(carousel.scrollLeft / scrollStep);
  if (currentPage > 0) {
    goToPage(currentPage - 1);
  }
});

navRight.addEventListener("click", () => {
  const currentPage = Math.round(carousel.scrollLeft / scrollStep);
  if (currentPage < totalPages - 1) {
    goToPage(currentPage + 1);
  }
});

// DESABILITAR DRAG E SCROLL MANUAL NO MOBILE
carousel.addEventListener("touchstart", e => {
  if (isMobile()) e.preventDefault();
});
carousel.addEventListener("mousedown", e => {
  if (isMobile()) e.preventDefault();
});

// Inicializa tudo
setupCarousel();
disableManualScrollOnMobile();

// Atualizar quando mudar tamanho da tela
window.addEventListener("resize", () => {
  setupCarousel();
  disableManualScrollOnMobile();
});
