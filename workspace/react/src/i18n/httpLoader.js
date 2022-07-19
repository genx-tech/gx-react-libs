import Runtime from '../Runtime';

const httpLoaderFn = (urlBuilder) => {
    const request = Runtime.getCreator('httpAgent')();

    return async (locale, moduleName) => {
        const url = urlBuilder(locale, moduleName);
        Runtime.log('verbose', () => `"httpLoader" loader is loading locale data from "${url}"`);

        const res = await request.get(url);
        return res.body;
    };
};

export default httpLoaderFn;
