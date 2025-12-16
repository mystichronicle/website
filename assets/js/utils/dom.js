/**
 * DOM Utility Functions
 * Provides consistent, reusable DOM query and manipulation helpers
 */

/**
 * Select a single element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export const $ = (selector) => {
	return document.querySelector(selector?.trim() || selector);
};

/**
 * Select multiple elements
 * @param {string} selector - CSS selector
 * @returns {Element[]}
 */
export const $$ = (selector) => {
	return [...document.querySelectorAll(selector?.trim() || selector)];
};

/**
 * Get element by ID
 * @param {string} id - Element ID
 * @returns {Element|null}
 */
export const $id = (id) => {
	return document.getElementById(id);
};

/**
 * Create element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Element attributes
 * @param {Array|string} children - Child elements or text
 * @returns {Element}
 */
export const createElement = (tag, attrs = {}, children = []) => {
	const element = document.createElement(tag);
	
	Object.entries(attrs).forEach(([key, value]) => {
		if (key === 'class') {
			element.className = value;
		} else if (key === 'style' && typeof value === 'object') {
			Object.assign(element.style, value);
		} else if (key.startsWith('data-')) {
			element.setAttribute(key, value);
		} else {
			element[key] = value;
		}
	});
	
	const childArray = Array.isArray(children) ? children : [children];
	childArray.forEach(child => {
		if (typeof child === 'string') {
			element.appendChild(document.createTextNode(child));
		} else if (child instanceof Element) {
			element.appendChild(child);
		}
	});
	
	return element;
};

/**
 * Add event listener with optional delegation
 * @param {Element|string} target - Element or selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {boolean} useCapture - Use capture phase
 */
export const on = (target, event, handler, useCapture = false) => {
	const element = typeof target === 'string' ? $(target) : target;
	if (element) {
		element.addEventListener(event, handler, useCapture);
	}
};

/**
 * Add event listener to multiple elements
 * @param {string} selector - CSS selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
export const onAll = (selector, event, handler) => {
	$$(selector).forEach(element => {
		element.addEventListener(event, handler);
	});
};

/**
 * Remove event listener
 * @param {Element|string} target - Element or selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
export const off = (target, event, handler) => {
	const element = typeof target === 'string' ? $(target) : target;
	if (element) {
		element.removeEventListener(event, handler);
	}
};

/**
 * Toggle class on element
 * @param {Element|string} target - Element or selector
 * @param {string} className - Class name to toggle
 */
export const toggleClass = (target, className) => {
	const element = typeof target === 'string' ? $(target) : target;
	if (element) {
		element.classList.toggle(className);
	}
};

/**
 * Check if element has class
 * @param {Element|string} target - Element or selector
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export const hasClass = (target, className) => {
	const element = typeof target === 'string' ? $(target) : target;
	return element ? element.classList.contains(className) : false;
};
