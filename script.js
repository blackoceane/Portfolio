// ---------- Menu burger ----------
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  const ouvert = menu.classList.toggle("ouvert");
  burger.setAttribute("aria-expanded", ouvert);
  burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
});

// Ferme le menu quand on choisit une section (sur téléphone)
menu.querySelectorAll("a").forEach((lien) => {
  lien.addEventListener("click", () => {
    menu.classList.remove("ouvert");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  });
});

// ---------- Filtre des projets ----------
const filtres = document.querySelectorAll(".filtre");
const projets = document.querySelectorAll(".projet");
const messageAucun = document.querySelector(".aucun");

filtres.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    const choix = bouton.dataset.filtre;

    filtres.forEach((b) => {
      b.classList.toggle("is-active", b === bouton);
      b.setAttribute("aria-pressed", b === bouton);
    });

    let visibles = 0;
    projets.forEach((projet) => {
      const domaines = projet.dataset.domaine.split(" ");
      const afficher = choix === "tous" || domaines.includes(choix);
      projet.hidden = !afficher;
      if (afficher) visibles++;
    });

    messageAucun.hidden = visibles > 0;
  });
});

// ---------- Validation du formulaire ----------
// Le site est statique (GitHub Pages) : il ne peut pas envoyer de courriel tout seul.
// Après la validation, on ouvre l'application de courriel avec le message déjà rempli.
const form = document.getElementById("form-contact");
const note = document.getElementById("note-form");

function afficherErreur(champ, texte) {
  document.getElementById("erreur-" + champ.id).textContent = texte;
  champ.setAttribute("aria-invalid", texte ? "true" : "false");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom");
  const courriel = document.getElementById("courriel");
  const message = document.getElementById("message");
  const courrielValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel.value.trim());

  afficherErreur(nom, nom.value.trim() ? "" : "Écris ton nom.");
  afficherErreur(courriel, courrielValide ? "" : "Écris un courriel valide, par exemple nom@exemple.com.");
  afficherErreur(message, message.value.trim().length >= 10 ? "" : "Écris un message d'au moins 10 caractères.");

  const premiereErreur = form.querySelector('[aria-invalid="true"]');
  if (premiereErreur) {
    premiereErreur.focus();
    return;
  }

  const sujet = encodeURIComponent("Message de " + nom.value.trim() + " (portfolio)");
  const corps = encodeURIComponent(message.value.trim() + "\n\n" + nom.value.trim() + "\n" + courriel.value.trim());
  window.location.href = "mailto:litchapjoyce@gmail.com?subject=" + sujet + "&body=" + corps;
  note.textContent = "Ton application de courriel vient de s'ouvrir. Il ne reste qu'à cliquer sur Envoyer.";
});
