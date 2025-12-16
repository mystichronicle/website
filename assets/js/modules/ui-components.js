import { config } from '../config.js';
import { $, $$ } from '../utils/dom.js';

/**
 * Open CLI version in new tab
 */
const openCli = () => {
	window.open(config.ui.cliUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Initialize CLI button with show/hide behavior
 */
export const initCliButton = () => {
	const viewCliBtn = $('.view-cli-btn');
	if (!viewCliBtn) return;

	viewCliBtn.addEventListener('click', openCli);

	const sections = config.ui.sections;
	const hideButton = () => { viewCliBtn.style.display = 'none'; };
	const showButton = () => { viewCliBtn.style.display = 'block'; };

	sections.forEach((section) => {
		const navLink = $(`a[href="${section}"]`);
		if (navLink) navLink.addEventListener('click', hideButton);
	});

	const homeLink = $(`a[href="${config.ui.home}"]`);
	if (homeLink) homeLink.addEventListener('click', showButton);
};

/**
 * Initialize back to top button
 * Shows button after scrolling past threshold
 */
export const initBackToTop = () => {
	const backToTopButton = $('#back-to-top');
	if (!backToTopButton) return;

	window.addEventListener('scroll', () => {
		if (window.pageYOffset > config.ui.backToTopOffset) {
			backToTopButton.classList.add('show');
		} else {
			backToTopButton.classList.remove('show');
		}
	});

	backToTopButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
};

/**
 * Initialize footer reveal on scroll
 * Shows footer when user scrolls near bottom
 */
export const initFooterReveal = () => {
	const footer = $('.credits');
	if (!footer) return;

	const checkFooterVisibility = () => {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (windowHeight + scrollTop >= documentHeight - config.ui.footerRevealOffset) {
			footer.classList.add('show');
		} else {
			footer.classList.remove('show');
		}
	};

	window.addEventListener('scroll', checkFooterVisibility);
	checkFooterVisibility();
};

/**
 * Generate HTML markup for social link
 * @param {Object} link - Link configuration object
 * @returns {string} HTML markup
 */
const socialLinkMarkup = (link) => {
	const rel = link.rel ? ` rel="${link.rel} noopener noreferrer"` : ' rel="noopener noreferrer"';
	const icon = link.customSvg ? link.customSvg : `<i class="${link.iconClass}" aria-hidden="true"></i>`;
	return `
		<a href="${link.href}" class="${link.className}" aria-label="${link.label}" target="_blank"${rel}>
			${icon}
		</a>
	`;
};

/**
 * Initialize social links from config
 * Renders social links to all data-component="social-links" elements
 */
export const initSocialLinks = () => {
	const hosts = $$('[data-component="social-links"]');
	if (!hosts.length) return;

	const markup = config.socialLinks.map(socialLinkMarkup).join('');
	hosts.forEach((host) => {
		host.innerHTML = markup;
		host.setAttribute('role', 'navigation');
		host.setAttribute('aria-label', 'Social media links');
		host.classList.add('social-links');
	});
};
