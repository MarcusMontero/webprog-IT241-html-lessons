console.log("Personal Profile Website Loaded");

// Small fade-in animation on scroll
const boxes = document.querySelectorAll(".section-box");

window.addEventListener("scroll", () => {
  boxes.forEach(box => {
    const position = box.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }
  });
});
