import './css/index.css';
import { setupTheme } from './js/theme.js';
import { setupContactAndFab } from './js/contact.js';
import { setupLightbox } from './js/lightbox.js';
import { setupMotion } from './js/motion.js';

document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupContactAndFab();
  setupLightbox();
  setupMotion();
});
