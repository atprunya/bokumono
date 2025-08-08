import '../styles/base.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/effects.css';
import { initInk } from './modules/ink.js';
import { initGlow } from './modules/glow.js';
import { initParallax } from './modules/parallax.js';
import { initModal } from './modules/modal.js';

initInk();
initGlow();
initParallax();
initModal();
