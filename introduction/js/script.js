document.addEventListener("DOMContentLoaded", function () {
  console.log("Personal profile website loaded");

  const links = document.querySelectorAll("nav ul li a");
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
