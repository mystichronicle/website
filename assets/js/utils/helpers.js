/**
 * Helper Utility Functions
 * Common utilities for debouncing, throttling, formatting, etc.
 */

/**
 * Debounce function - delays execution until after wait period
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/**
 * Throttle function - limits execution to once per wait period
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, wait = 300) => {
	let inThrottle;
	return function executedFunction(...args) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), wait);
		}
	};
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'iso')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
	const d = new Date(date);
	
	if (isNaN(d.getTime())) {
		return 'Invalid Date';
	}
	
	const options = {
		short: { year: 'numeric', month: 'short', day: 'numeric' },
		long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
		iso: undefined
	};
	
	if (format === 'iso') {
		return d.toISOString();
	}
	
	return d.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncate = (text, length = 100, suffix = '...') => {
	if (!text || text.length <= length) {
		return text;
	}
	return text.substring(0, length).trim() + suffix;
};

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
export const deepClone = (obj) => {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	
	if (obj instanceof Date) {
		return new Date(obj.getTime());
	}
	
	if (obj instanceof Array) {
		return obj.map(item => deepClone(item));
	}
	
	if (obj instanceof Object) {
		const clonedObj = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				clonedObj[key] = deepClone(obj[key]);
			}
		}
		return clonedObj;
	}
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (obj) => {
	if (obj == null) return true;
	if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
	if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
	return Object.keys(obj).length === 0;
};

/**
 * Generate random ID
 * @param {number} length - ID length (default: 8)
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
	return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Clamp number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
	return Math.min(Math.max(value, min), max);
};

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @param {number} offset - Offset in pixels (default: 0)
 * @returns {boolean} True if in viewport
 */
export const isInViewport = (element, offset = 0) => {
	if (!element) return false;
	
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= -offset &&
		rect.left >= -offset &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
	);
};
