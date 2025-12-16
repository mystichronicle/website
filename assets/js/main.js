/**
 * Main Application Entry Point
 * Initializes all modules and sets up global error handlers
 * @module main
 */

import { initNavigation } from './modules/navigation.js';
import { initProjects } from './modules/projects.js';
import { initTypewriter } from './modules/typewriter.js';
import { initBackToTop, initCliButton, initFooterReveal, initSocialLinks } from './modules/ui-components.js';
import { createLogger } from './utils/logger.js';

const logger = createLogger('Main');

/**
 * Global error handler for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
	logger.error('Unhandled Promise rejection:', event.reason);
	event.preventDefault();
});

/**
 * Global error handler for uncaught errors
 */
window.addEventListener('error', (event) => {
	logger.error('Uncaught error:', event.error || event.message);
});

/**
 * Initialize all application modules
 */
const initializeApp = () => {
	try {
		initNavigation();
		initCliButton();
		initSocialLinks();
		initTypewriter();
		initBackToTop();
		initFooterReveal();
		initProjects();
		logger.info('Application initialized successfully');
	} catch (error) {
		logger.error('Failed to initialize application:', error);
	}
};

window.addEventListener('DOMContentLoaded', initializeApp);
