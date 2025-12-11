"use strict";

/* ---------------------------------------- */
/*  SKILL ICON RESPONSIVE (optional working) */
/* ---------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const imgs = document.querySelectorAll("#software-tools-img");
  const desktopPerLine = 14;
  const tabletPerLine = 8;
  const mobilePerLine = 5;

  function updateImageSrc() {
    imgs.forEach((img) => {
      const currentSrc = img.src.split("&perline=")[0];
      if (window.innerWidth < 768) {
        img.src = currentSrc + "&perline=" + mobilePerLine;
      } else if (window.innerWidth < 1024) {
        img.src = currentSrc + "&perline=" + tabletPerLine;
      } else {
        img.src = currentSrc + "&perline=" + desktopPerLine;
      }
    });
  }

  updateImageSrc();
  window.addEventListener("resize", updateImageSrc);
});

/* ---------------------------------------- */
/* SMOOTH SCROLL (Lenis)                    */
/* ---------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 0.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});

/* ---------------------------------------- */
/* SIDEBAR TOGGLE                           */
/* ---------------------------------------- */

const elementToggleFunc = (elem) => {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  if (window.innerWidth <= 1250) {
    elementToggleFunc(sidebar);
  } else {
    sidebar.classList.remove("active");
  }
});

/* ---------------------------------------- */
/* TESTIMONIAL POPUP (if used later)        */
/* ---------------------------------------- */

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (modalContainer) {
  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach((item) => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

/* ---------------------------------------- */
/* PAGE NAVIGATION — FIXED                  */
/* ---------------------------------------- */

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetPage = link.innerText.toLowerCase(); // matches data-page

    // Remove active from all
    navigationLinks.forEach((btn) => btn.classList.remove("active"));
    link.classList.add("active");

    pages.forEach((page) => {
      page.classList.remove("active");
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      }
    });
  });
});
