const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');
const overlay = document.querySelector('.overlay');

// --- FONCTIONS UTILITAIRES ---
// On crée ces fonctions pour ne pas répéter le code partout

function openMenu() {
    primaryNav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
    overlay.setAttribute('data-visible', true);
    document.body.classList.add('noscroll');
}

function closeMenu() {
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
    overlay.setAttribute('data-visible', false);
    document.body.classList.remove('noscroll');
}

// --- ÉVÉNEMENTS ---

// 1. Le Bouton Burger (Ouvre OU Ferme)
navToggle.addEventListener('click', () => {
    // On regarde si c'est déjà ouvert
    const isVisible = primaryNav.getAttribute('data-visible') === "true";

    if (!isVisible) {
        openMenu();
    } else {
        closeMenu();
    }
});

// 2. L'Overlay (Ferme UNIQUEMENT)
// Si on clique sur le fond sombre, on veut toujours fermer, jamais ouvrir.
overlay.addEventListener('click', closeMenu);

// 3. La Touche Echap (Ferme UNIQUEMENT)
// Petit bonus d'accessibilité très apprécié
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && primaryNav.getAttribute('data-visible') === "true") {
        closeMenu();
        navToggle.focus(); // On renvoie le focus sur le bouton pour les gens qui naviguent au clavier
    }
});















// const navToggle = document.querySelector('.nav-toggle');
// const primaryNav = document.querySelector('.primary-navigation');
// const overlay = document.querySelector('.overlay');

// navToggle.addEventListener('click', () => {
//   // On vérifie l'état actuel (true ou false ?)
//   const isVisible = primaryNav.getAttribute('data-visible') === "true";

//   // Si le menu est ouvert (isVisible est vrai), on va le fermer.
//   // Si le menu est fermé (isVisible est faux), on va l'ouvrir.
//   // On inverse donc la valeur actuelle (!isVisible).

//   // 1. On bascule les attributs ARIA et DATA
//   primaryNav.setAttribute('data-visible', !isVisible);
//   navToggle.setAttribute('aria-expanded', !isVisible);
//   overlay.setAttribute('data-visible', !isVisible);

//   // 2. GESTION DU SCROLL (La nouveauté)
//   // Si on ouvre (!isVisible est vrai), on ajoute la classe. Sinon on l'enlève.
//   if (!isVisible) {
//     document.body.classList.add('noscroll');
//   } else {
//     document.body.classList.remove('noscroll');
//   }
// });