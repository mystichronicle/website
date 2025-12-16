/**
 * Central configuration for the site
 * Single source of truth for all application settings
 * @type {Object}
 */
export const config = {
	/**
	 * GitHub API configuration
	 */
	github: {
		username: 'mystichronicle',
		apiUrl: 'https://api.github.com',
		reposPerPage: 150,
		sort: 'created',
		direction: 'desc',
		maxRetries: 2,
		retryDelay: 1000
	},
	/**
	 * UI behavior configuration
	 */
	ui: {
		sections: ['#resume', '#projects', '#contact'],
		home: '#header',
		cliUrl: 'https://mystichronicle.github.io',
		backToTopOffset: 300,
		footerRevealOffset: 100,
		searchDebounce: 300
	},
	/**
	 * Typewriter effect configuration
	 */
	typewriter: {
		selector: '.typewriter-name',
		strings: ['Hi, This is Debjit'],
		typeSpeed: 100,
		backSpeed: 50,
		loop: false,
		showCursor: true,
		cursorChar: '|',
		startDelay: 500
	},
	/**
	 * Social media links configuration
	 */
	socialLinks: [
		{
			name: 'GitHub',
			href: 'https://github.com/mystichronicle',
			className: 'github',
			iconClass: 'bi bi-github',
			label: 'GitHub Profile'
		},
		{
			name: 'X',
			href: 'https://x.com/mystichronicle',
			className: 'twitter',
			label: 'X (Twitter) Profile',
			customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>`
		},
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com/in/mystichronicle',
			className: 'linkedin',
			iconClass: 'bi bi-linkedin',
			label: 'LinkedIn Profile'
		},
		{
			name: 'Mastodon',
			href: 'https://mastodon.social/@mystichronicle',
			className: 'mastodon',
			iconClass: 'bi bi-mastodon',
			label: 'Mastodon Profile',
			rel: 'me'
		}
	]
};
