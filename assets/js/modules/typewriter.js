import { config } from '../config.js';
import { $ } from '../utils/dom.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Typewriter');

export const initTypewriter = () => {
	const settings = config.typewriter;
	const typewriterElement = $(settings.selector);

	if (!typewriterElement) return;

	if (typeof Typed === 'undefined') {
		logger.warn('Typed.js not available, using fallback text');
		typewriterElement.textContent = settings.strings[0];
		return;
	}

	try {
		new Typed(settings.selector, {
			strings: settings.strings,
			typeSpeed: settings.typeSpeed,
			backSpeed: settings.backSpeed,
			loop: settings.loop,
			showCursor: settings.showCursor,
			cursorChar: settings.cursorChar,
			startDelay: settings.startDelay,
			onComplete: function (self) {
				self.cursor.style.display = 'none';
			}
		});
	} catch (error) {
		logger.warn('Typed.js error, using fallback:', error);
		typewriterElement.textContent = settings.strings[0];
	}
};
