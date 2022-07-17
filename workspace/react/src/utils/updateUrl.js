import { queryStringToObject, objectToQueryString, dropIfStartsWith } from '@genx/july';

const updateUrl = (url, updateParts, local) => {
    let { origin, pathname, search, hash } =
        url == null ? window.location : typeof url === 'object' ? url : new URL(url);
    updateParts != null || (updateParts = {});

    if (updateParts.query) {
        search = '?' + objectToQueryString(updateParts.query);
    } else if (updateParts.updateQuery) {
        const query = { ...queryStringToObject(dropIfStartsWith(search, '?')), ...updateParts.updateQuery };
        search = '?' + objectToQueryString(query);
    }

    if (updateParts.pathname) {
        pathname = updateParts.pathname;
    }

    if (updateParts.hash) {
        hash = updateParts.hash;
    }

    let localPath = `${pathname}${search}${hash}`;

    return url == null || local ? localPath : `${origin}${localPath}`;
};

export default updateUrl;
