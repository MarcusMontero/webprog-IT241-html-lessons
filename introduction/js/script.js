document.addEventListener("DOMContentLoaded", function () {
  console.log("Personal profile website loaded");

  // Smooth scrolling for navbar links
  const links = document.querySelectorAll("nav ul li a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
