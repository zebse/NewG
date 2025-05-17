(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
})();

document
  .getElementById("toggle-courses-btn")
  ?.addEventListener("click", function () {
    const hiddenCourses = document.getElementById("hidden-courses");
    const button = this;

    if (hiddenCourses.style.display === "none") {
      hiddenCourses.style.display = "flex";
      button.textContent = "See Less Courses";
    } else {
      hiddenCourses.style.display = "none";
      button.textContent = "See More Courses";
    }
  });

// Modular menu
document.addEventListener("DOMContentLoaded", function () {
  const navItems = [
    { name: "Home", href: "index.html" },
    {
      name: "About",
      href: "#",
      dropdown: [
        { name: "About us", href: "about.html" },
        { name: "Academics", href: "academic.html" },
        { name: "Alumni", href: "#" },
        { name: "Registrar", href: "http://196.188.42.93:2123/", target:"_blank" },
        { name: "Admission", href: "#" },
      ],
    },
    { name: "News and Events", href: "events.html" },
    { name: "Training", href: "training.html" },
    { name: "Research", href: "research.html" },
    { name: "Contact", href: "contact.html" },
  ];

  const navMenu = document.querySelector("#navmenu ul");

  if (!navMenu) {
    console.warn("#navmenu ul not found. Skipping menu creation.");
    return;
  }

  function createNavList() {
    navMenu.innerHTML = "";

    navItems.forEach((item) => {
      const li = document.createElement("li");
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      const isActive = currentPage === item.href.split("/").pop();
      if (isActive) {
        li.classList.add("active");
      }

      const a = document.createElement("a");
      a.href = item.href;

      if (item.dropdown) {
        li.classList.add("dropdown");
        a.innerHTML = `<span>${item.name}</span> <i class="bi bi-chevron-down toggle-dropdown"></i>`;
        a.href = "#";

        const dropdownUl = document.createElement("ul");
        dropdownUl.classList.add("dropdown-menu");

        item.dropdown.forEach((dropdownItem) => {
          const dropdownLi = document.createElement("li");
          const dropdownA = document.createElement("a");
          dropdownA.href = dropdownItem.href;
          dropdownA.target = dropdownItem.target;
          dropdownA.textContent = dropdownItem.name;
          dropdownLi.appendChild(dropdownA);
          dropdownUl.appendChild(dropdownLi);
        });

        li.appendChild(a);
        li.appendChild(dropdownUl);

        // Toggle dropdown on click
        a.querySelector(".toggle-dropdown").addEventListener("click", function (e) {
          e.preventDefault();
          dropdownUl.classList.toggle("dropdown-active");
          li.classList.toggle("active");
          e.stopImmediatePropagation();
        });
      } else {
        if (item.name === "Home") {
          a.innerHTML = "Home<br>";
        } else {
          a.textContent = item.name;
        }
        li.appendChild(a);
      }

      navMenu.appendChild(li);
    });
  }

  createNavList();
});

// Lazy load images
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy-load"));

  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy-load");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      observer.observe(img);
    });
  } else {
    // Fallback for older browsers
    lazyImages.forEach(function (img) {
      img.src = img.dataset.src;
    });
  }
});
