import { Runtime } from '@genx/react';
import detectBrowserLanguage from 'detect-browser-language';

// ----------------------------------------------------------------------

Runtime.register('language-detector', { detect: detectBrowserLanguage });
