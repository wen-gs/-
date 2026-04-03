import './css/index.css';
import { createIcons, icons } from 'lucide';
import { setupTheme } from './js/theme.js';
import { setupLoader } from './js/loader.js';
import { setupContactAndFab } from './js/contact.js';
import { setupLightbox } from './js/lightbox.js';
import { setupMotion } from './js/motion.js';

document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupLoader();
  createIcons({ icons });
  setupContactAndFab();
  setupLightbox();
  setupMotion();
});
