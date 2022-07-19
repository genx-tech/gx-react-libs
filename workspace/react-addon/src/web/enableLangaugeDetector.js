import { Runtime } from '@genx/react';
import detectBrowserLanguage from 'detect-browser-language';

// ----------------------------------------------------------------------

Runtime.registerObject('languageDetector', { detect: detectBrowserLanguage });
