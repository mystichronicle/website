import { config } from '../config.js';
import { $, $$ } from '../utils/dom.js';

/**
 * Scroll smoothly to top of page
 */
const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Set active state on navigation link
 * @param {HTMLElement} link - Link to activate
 * @param {HTMLElement[]} navlinks - All navigation links
 */
const setActiveLink = (link, navlinks) => {
	navlinks.forEach((item) => item.classList.remove('active'));
	if (link) link.classList.add('active');
};

/**
 * Show section based on hash and manage header state
 * @param {string} hash - Section hash to show
 * @param {HTMLElement} header - Header element
 * @param {HTMLElement[]} sections - All section elements
 */
const showSection = (hash, header, sections) => {
	const section = $(hash);
	if (!section) return;

	if (hash === config.ui.home) {
		header.classList.remove('header-top');
		sections.forEach((item) => item.classList.remove('section-show'));
		return;
	}

	if (!header.classList.contains('header-top')) {
		header.classList.add('header-top');
		setTimeout(() => {
			sections.forEach((item) => item.classList.remove('section-show'));
			section.classList.add('section-show');
		}, 350);
	} else {
		sections.forEach((item) => item.classList.remove('section-show'));
		section.classList.add('section-show');
	}
};

/**
 * Initialize navigation system
 * Sets up mobile toggle, section navigation, and hash-based routing
 */
export const initNavigation = () => {
	const navbar = $('#navbar');
	const navlinks = $$('#navbar .nav-link');
	const header = $('#header');
	const sections = $$('section');
	const mobileToggle = $('.mobile-nav-toggle');

	if (!navbar || !header || !sections.length) return;

	if (mobileToggle) {
		mobileToggle.addEventListener('click', () => {
			navbar.classList.toggle('navbar-mobile');
			mobileToggle.classList.toggle('bi-list');
			mobileToggle.classList.toggle('bi-x');
		});
	}

	navlinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			const targetHash = link.hash;
			if (!targetHash) return;

			const section = $(targetHash);
			if (!section) return;

			event.preventDefault();
			setActiveLink(link, navlinks);

			if (navbar.classList.contains('navbar-mobile')) {
				navbar.classList.remove('navbar-mobile');
				if (mobileToggle) {
					mobileToggle.classList.toggle('bi-list');
					mobileToggle.classList.toggle('bi-x');
				}
			}

			showSection(targetHash, header, sections);
			scrollToTop();
		});
	});

	window.addEventListener('load', () => {
		if (!window.location.hash) return;
		const initialSection = $(window.location.hash);
		if (!initialSection) return;

		header.classList.add('header-top');
		setActiveLink(navlinks.find((item) => item.getAttribute('href') === window.location.hash), navlinks);

		setTimeout(() => {
			initialSection.classList.add('section-show');
		}, 350);

		scrollToTop();
	});
};
