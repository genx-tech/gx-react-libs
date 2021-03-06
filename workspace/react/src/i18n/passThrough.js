import Runtime from '../Runtime';

export const missingTable = new Set();

const translatorFn = (moduleName, sourceView) => (t) => {
    if (Runtime.config.warnMissingTranslation && t && !missingTable.has(t)) {
        Runtime.log('warning', () => [
            `Missing translation. Module: ${moduleName}, Message: ${t}`,
            'View:',
            sourceView ?? 'unknown',
        ]);
        missingTable.add(t);
    }

    return t;
};

export default translatorFn;
