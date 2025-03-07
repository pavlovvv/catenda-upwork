const accordions = document.querySelectorAll(".accordion, .burger__menu > div > ul > li");

accordions.forEach((accordion, index) => {
  const header = accordion.querySelector(".accordion__header, .burger__menu > div > ul > li > a");
  const content = accordion.querySelector(".accordion__content, .burger__menu > div > ul > li > div");

  // Открываем первый аккордеон по умолчанию
  if (index === 0) {
    accordion.classList.add("open");
    content.style.maxHeight = content.scrollHeight + 24 + "px";
  }

  header.addEventListener("click", () => {
    accordion.classList.toggle("open");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 24 + "px";
    }
  });
});

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

counters.forEach((counter) => observer.observe(counter));

const fadeElements = document.querySelectorAll(".fade");

const observerOptions = {
  threshold: 0.1,
  /* 0.1 means the callback triggers when 
         at least 10% of element is in viewport */
};

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add .show to trigger fade-in
      entry.target.classList.add("show");
      // Optional: Stop observing once shown
      observer2.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach((el) => {
  observer2.observe(el);
});

const parallaxElements = document.querySelectorAll(".parallax");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY; // how far user has scrolled

    parallaxElements.forEach((elem) => {
      // Grab direction ('left' or 'right') and speed from data attributes
      const direction = elem.dataset.direction || "left";
      const speed = parseFloat(elem.dataset.speed) || 0.2;

      // Amount to move based on scroll
      // E.g. if scrollY = 200, speed=0.2 => offset = 200 * 0.2 = 40px
      const offset = scrollY * speed;

      // Combine direction + offset into a transform
      // We'll keep the fade's translateY(0) from the .show class,
      // but we add an additional X translation for the parallax

      if (direction === "left") {
        elem.style.transform = `translateX(-${offset}px)`;
      } else if (direction === "right") {
        elem.style.transform = `translateX(${offset}px)`;
      }
      else if (direction === "up") {
        elem.style.transform = `translateY(-${offset}px)`;
      } else if (direction === "down") {
        elem.style.transform = `translateY(${offset}px)`;
      }
    });
});






// const headerAccordions = document.querySelectorAll(".header__nav li");

// headerAccordions.forEach((headerAccordion) => {
//   const header = headerAccordion.querySelector(".header__nav li>div:first-child");
//   const arrow = headerAccordion.querySelector(".header__nav li img, .burger__menu > div > div img");
//   header.addEventListener("click", () => {
//     headerAccordion.classList.toggle("open");
//     arrow.classList.toggle("open");

//     const content = headerAccordion.querySelector(".header__nav li>div:last-child");
//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + 24 + "px";
//     }
//   });
// });

// drawer
const burgerIcon = document.querySelector(".burger__icon");
const burgerMenu = document.querySelector(".burger__menu");

if (burgerIcon && burgerMenu) {
  burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    document.body.style.overflow = burgerMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  document.addEventListener("click", (event) => {
    if (
      !burgerMenu.contains(event.target) &&
      !burgerIcon.contains(event.target)
    ) {
      burgerIcon.classList.remove("active");
      burgerMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}