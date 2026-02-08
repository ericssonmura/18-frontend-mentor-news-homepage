const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');
const overlay = document.querySelector('.overlay');

function openMenu() {
    primaryNav.setAttribute('data-visible', "true");
    navToggle.setAttribute('aria-expanded', "true");
    overlay.setAttribute('data-visible', "true");
    document.body.classList.add('noscroll');
}

function closeMenu() {
    primaryNav.setAttribute('data-visible', "false");
    navToggle.setAttribute('aria-expanded', "false");
    overlay.setAttribute('data-visible', "false");
    document.body.classList.remove('noscroll');
}

// --- EVENTS ---

navToggle.addEventListener('click', () => {
    const isVisible = primaryNav.getAttribute('data-visible') === "true";

    if (!isVisible) {
        openMenu();
    } else {
        closeMenu();
    }
});

overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && primaryNav.getAttribute('data-visible') === "true") {
        closeMenu();
        navToggle.focus();
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