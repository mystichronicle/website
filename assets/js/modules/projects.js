import { config } from '../config.js';
import { $, $$ } from '../utils/dom.js';
import { createLogger } from '../utils/logger.js';
import { debounce } from '../utils/helpers.js';

const logger = createLogger('Projects');

/**
 * Get the projects container element
 * @returns {HTMLElement|null} Projects grid container
 */
const container = () => $('#projects-grid');

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML string
 */
const escapeHtml = (text) => {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
};

/**
 * Render loading spinner
 * @param {HTMLElement} target - Target element
 */
const renderSpinner = (target) => {
	target.innerHTML = `
		<div class="loading-spinner">
			<div class="spinner"></div>
			<p>Loading projects...</p>
		</div>
	`;
};

/**
 * Render error message
 * @param {HTMLElement} target - Target element
 * @param {Object} message - Error message object
 * @param {string} message.text - Error text
 */
const renderError = (target, message) => {
	target.innerHTML = `<p class="error-state">${escapeHtml(message.text)}</p>`;
};

/**
 * Render empty state message
 * @param {HTMLElement} target - Target element
 */
const renderEmpty = (target) => {
	target.innerHTML = '<p class="empty-state">No projects found.</p>';
};

/**
 * Render projects to the DOM
 * @param {HTMLElement} target - Target element
 * @param {Array<Object>} repos - Array of repository objects
 */
const renderProjects = (target, repos) => {
	if (!repos || repos.length === 0) {
		renderEmpty(target);
		return;
	}

	target.innerHTML = '';
	repos.forEach((repo) => {
		const projectElement = document.createElement('div');
		projectElement.className = 'project';

		const name = escapeHtml(repo.name);
		const description = escapeHtml(repo.description || 'No description available.');
		const url = escapeHtml(repo.html_url);

		projectElement.innerHTML = `
			<h3>${name}</h3>
			<p>${description}</p>
			<a href="${url}" target="_blank" rel="noopener noreferrer">
				View Project <i class="bi bi-box-arrow-up-right"></i>
			</a>
		`;

		target.appendChild(projectElement);
	});
};

/**
 * Filter projects by search query
 * @param {Array<Object>} repos - Array of repository objects
 * @param {string} query - Search query
 * @returns {Array<Object>} Filtered repositories
 */
const filterProjects = (repos, query) => {
	const term = query.toLowerCase();
	return repos.filter((repo) => repo.name.toLowerCase().includes(term));
};

/**
 * Build GitHub API URL from config
 * @returns {string} Complete API URL
 */
const buildApiUrl = () => {
	const { username, apiUrl, reposPerPage, sort, direction } = config.github;
	return `${apiUrl}/users/${encodeURIComponent(username)}/repos?per_page=${reposPerPage}&sort=${sort}&direction=${direction}`;
};

/**
 * Fetch with retry logic and rate limit handling
 * @param {string} url - URL to fetch
 * @param {number} retries - Number of retries remaining
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} When all retries are exhausted
 */
const fetchWithRetry = async (url, retries = config.github.maxRetries) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			const resetTime = response.headers.get('X-RateLimit-Reset');
			if (response.status === 403 && resetTime) {
				const resetDate = new Date(resetTime * 1000);
				throw new Error(`Rate limited. Try again after ${resetDate.toLocaleTimeString()}`);
			}
			throw new Error(`HTTP ${response.status}`);
		}
		return response.json();
	} catch (error) {
		if (retries > 0) {
			await new Promise((resolve) => setTimeout(resolve, config.github.retryDelay));
			return fetchWithRetry(url, retries - 1);
		}
		throw error;
	}
};

/**
 * Initialize projects section with GitHub data
 * Fetches repositories and sets up search functionality
 * @returns {Promise<void>}
 */
export const initProjects = async () => {
	const target = container();
	if (!target) return;

	renderSpinner(target);

	try {
		const repos = await fetchWithRetry(buildApiUrl());
		renderProjects(target, repos);

		const searchInput = $('#search');
		if (searchInput) {
			searchInput.addEventListener('input', debounce(() => {
				const filtered = filterProjects(repos, searchInput.value || '');
				renderProjects(target, filtered);
			}, config.ui.searchDebounce));
		}
	} catch (error) {
		logger.error('Error fetching projects:', error);
		renderError(target, { text: 'Failed to load projects. Please try again later.' });
	}
};
