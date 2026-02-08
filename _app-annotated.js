const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');
const overlay = document.querySelector('.overlay');

// --- FONCTIONS EXISTANTES ---

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

  // NETTOYAGE SWIPE : On s'assure qu'il ne reste pas de style inline
  // (au cas où on ferme via le bouton après avoir commencé à slider un peu)
  primaryNav.style.transform = '';
}

// --- EVENTS CLASSIQUES ---

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

// ============================================================
//  GESTION DU DRAG (Version Finale Universelle)
// ============================================================

let startX = 0;
let currentX = 0;
let isDragging = false;

// 1. DÉBUT DU GESTE (Clic ou Toucher)
primaryNav.addEventListener('pointerdown', (e) => {
  // Si le menu est fermé, on ne fait rien
  if (primaryNav.getAttribute('data-visible') !== "true") return;

  // Capture le curseur (garde le focus même si la souris sort de la zone)
  primaryNav.setPointerCapture(e.pointerId);

  startX = e.clientX;
  isDragging = true;

  // IMPORTANT : On coupe l'animation CSS pour que le menu colle au doigt immédiatement
  primaryNav.style.transition = 'none';
});


// 2. MOUVEMENT
primaryNav.addEventListener('pointermove', (e) => {
  if (!isDragging) return;

  // Empêche la sélection de texte ou les comportements bizarres du navigateur
  e.preventDefault();

  currentX = e.clientX;
  const diffX = currentX - startX;

  // On ne bouge que si on va vers la DROITE (diffX positif) pour fermer
  if (diffX > 0) {
    primaryNav.style.transform = `translateX(${diffX}px)`;
  }
});


// 3. FIN DU GESTE (Relâchement)
primaryNav.addEventListener('pointerup', (e) => {
  if (!isDragging) return;

  isDragging = false;

  // On relâche la capture du curseur proprement
  if (primaryNav.hasPointerCapture(e.pointerId)) {
    primaryNav.releasePointerCapture(e.pointerId);
  }

  const diffX = currentX - startX;
  const threshold = 75; // Distance (en px) pour valider la fermeture

  // On RÉACTIVE la transition pour que la fin du mouvement soit fluide
  primaryNav.style.transition = '';

  if (diffX > threshold) {
    // --- ON FERME (Succès) ---
    closeMenu();

    // Petit nettoyage après l'animation (0.3s) pour virer le style inline
    setTimeout(() => {
      primaryNav.style.transform = '';
    }, 300);

  } else {
    // --- ON ANNULE (Retour à 0) ---
    primaryNav.style.transform = '';
  }

  // Reset des variables
  startX = 0;
  currentX = 0;
});

// Sécurité : Si le geste est interrompu (ex: alt-tab, appel téléphonique)
primaryNav.addEventListener('pointercancel', () => {
  isDragging = false;
  primaryNav.style.transition = '';
  primaryNav.style.transform = '';
});


/* DEBUG
// --- LE DÉTECTIVE ---
document.addEventListener('click', (e) => {
  console.log("------------------------------------------------");
  console.log("🎯 TU AS CLIQUÉ SUR :", e.target);
  console.log("CLASSE :", e.target.className);
  console.log("PARENT :", e.target.parentElement);
  console.log("------------------------------------------------");
});
*/