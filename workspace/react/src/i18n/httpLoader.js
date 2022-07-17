import request from 'superagent';
import Runtime from '../Runtime';

export default (urlBuilder) => async (locale, moduleName) => {
    const url = urlBuilder(locale, moduleName);
    Runtime.log('verbose', () => `"httpLoader" loader is loading locale data from "${url}"`);

    const res = await request.get(url);
    return res.body;
};