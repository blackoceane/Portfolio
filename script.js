// Menu burger
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Validation formulaire
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const text = document.getElementById("message").value.trim();

  if (!name || !email || !text) {
    message.textContent = "Veuillez remplir tous les champs.";
    message.style.color = "red";
  } else {
    message.textContent = "Message envoyé avec succès ✔";
    message.style.color = "lime";
    form.reset();
  }
});
