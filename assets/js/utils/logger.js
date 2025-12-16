/**
 * Logger Utility
 * Provides consistent logging interface with environment-aware output
 */

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

/**
 * Log levels
 */
export const LogLevel = {
	DEBUG: 'debug',
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error'
};

/**
 * Logger class
 */
class Logger {
	constructor(context = '') {
		this.context = context;
	}

	/**
	 * Format log message with context
	 * @param {string} level - Log level
	 * @param {string} message - Log message
	 * @param  {...any} args - Additional arguments
	 * @returns {Array}
	 */
	_format(level, message, ...args) {
		const prefix = this.context ? `[${this.context}]` : '';
		return [`${prefix} ${message}`, ...args];
	}

	/**
	 * Log debug message (only in development)
	 * @param {string} message - Log message
	 * @param  {...any} args - Additional arguments
	 */
	debug(message, ...args) {
		if (isDevelopment) {
			console.log(...this._format(LogLevel.DEBUG, message, ...args));
		}
	}

	/**
	 * Log info message
	 * @param {string} message - Log message
	 * @param  {...any} args - Additional arguments
	 */
	info(message, ...args) {
		if (isDevelopment) {
			console.info(...this._format(LogLevel.INFO, message, ...args));
		}
	}

	/**
	 * Log warning message
	 * @param {string} message - Log message
	 * @param  {...any} args - Additional arguments
	 */
	warn(message, ...args) {
		console.warn(...this._format(LogLevel.WARN, message, ...args));
	}

	/**
	 * Log error message
	 * @param {string} message - Log message
	 * @param  {...any} args - Additional arguments
	 */
	error(message, ...args) {
		console.error(...this._format(LogLevel.ERROR, message, ...args));
	}
}

/**
 * Create a logger instance with context
 * @param {string} context - Logger context (e.g., module name)
 * @returns {Logger}
 */
export const createLogger = (context) => new Logger(context);

/**
 * Default logger instance
 */
export const logger = new Logger();
