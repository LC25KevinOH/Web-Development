  // Handle the menu toggle (after includes load)
  document.addEventListener("click", (e) => {
    if (e.target.matches(".menu-toggle")) {
      const nav = e.target.nextElementSibling; // nav comes right after button
      nav.classList.toggle("active");
    }
  });