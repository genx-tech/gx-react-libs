import Runtime from '../Runtime';

export default (pathBuilder) => async (locale, moduleName) => {
    const path = pathBuilder(locale, moduleName);
    Runtime.log('verbose', () => `"importLoader" loader is loading locale data from "${path}"`);

    return Runtime.require(path);
};
