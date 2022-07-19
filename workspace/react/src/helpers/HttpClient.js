import { url as urlUtil } from '@genx/july';
import _each from 'lodash/each';
import Runtime from '../Runtime';

const AllowedMethods = {
    get: 'get',
    post: 'post',
    put: 'put',
    del: 'del',
    delete: 'del',
    upload: 'post',
    download: 'get',
};

function resToPath(parts) {
    return parts ? (Array.isArray(parts) ? parts.map((res) => encodeURIComponent(res)).join('/') : parts) : '';
}

function setUploadBody(req, body, options) {
    const formData = options.formData;

    if (formData) {
        _each(formData, (v, k) => {
            req.field(k, v);
        });
    }

    req.attach(options.fileField ?? 'file', body, options.fileName);
}

/**
 * Http client.
 * @class
 */
class HttpClient {
    static create() {
        return new HttpClient();
    }

    /**
     * HttpClient constructor
     * @param {*} endpoint - Default endpoint
     */
    constructor(endpoint, config) {
        endpoint != null || (endpoint = '');
        this.endpoint = endpoint;
        this.agent = Runtime.getCreator('httpAgent')(config);
    }

    /**
     * Http get request.
     * @param {string|Array} resource
     * @param {Object} query
     * @param {Object} options
     * @property {string} [options.endpoint] - Override the default base endpoint
     * @property {Function} [options.onProgress] - Report progress when waiting for response
     */
    async get(resource, query, options) {
        return this._send('get', resToPath(resource), query, null, options);
    }

    /**
     * Http post request.
     * @param {string|Array} resource
     * @param {Object} data
     * @param {Object} query
     * @param {Object} options
     * @property {string} [options.endpoint] - Override the default base endpoint
     * @property {Function} [options.onProgress] - Report progress when waiting for response
     */
    async post(resource, data, query, options) {
        return this._send('post', resToPath(resource), query, data, options);
    }

    /**
     * Http put request.
     * @param {string|Array} resource
     * @param {Object} data
     * @param {Object} query
     * @param {Object} options
     * @property {string} [options.endpoint] - Override the default base endpoint
     * @property {Function} [options.onProgress] - Report progress when waiting for response
     */
    async put(resource, data, query, options) {
        return this._send('put', resToPath(resource), query, data, options);
    }

    /**
     * Http del request.
     * @param {string|Array} resource
     * @param {Object} query
     * @param {Object} options
     * @property {string} [options.endpoint] - Override the default base endpoint
     * @property {Function} [options.onProgress] - Report progress when waiting for response
     */
    async del(resource, query, options) {
        return this._send('del', resToPath(resource), query, null, options);
    }

    /**
     * Http upload request.
     * @param {string|Array} resource
     * @param {string} file
     * @param {Object} query
     * @param {Object} options
     * @property {string} [options.endpoint] - Override the default base endpoint
     * @property {Function} [options.onProgress] - Report progress when waiting for response
     * @property {Object} [options.formData] - Form data passed while uploading
     * @property {string} [options.fileField="file"] - File field name, default as "file"
     */
    async upload(resource, file, query, options) {
        return this._send('upload', resToPath(resource), query, file, options, setUploadBody);
    }

    /**
     * Http download request.
     * @param {string|Array} resource
     * @param {Object} query
     * @param {Object} options
     * @property {string} [options.endpoint] - Override the default base endpoint
     * @property {Function} [options.onProgress] - Report progress when waiting for response
     */
    async download(resource, query, options) {
        return this._send('download', resToPath(resource), query, null, options);
    }

    async _send(method, path, query, body, options, setRequestBody) {
        method = method.toLowerCase();
        options == null && (options = {});

        const httpMethod = options.httpMethod ?? AllowedMethods[method];
        if (!httpMethod) {
            throw new Error('Invalid method: ' + method);
        }

        const url =
            path.startsWith('http:') || path.startsWith('https:')
                ? path // absolute url
                : urlUtil.join(options.endpoint ?? this.endpoint, path);

        const req = this._createRequest(httpMethod, url);

        if (this.onSending) {
            this.onSending(req, httpMethod, url);
        }

        const extraHeaders = options.headers;
        if (extraHeaders) {
            _each(extraHeaders, (v, k) => {
                req.set(k, v);
            });
        }

        if (options.withCORS) {
            req.set('Access-Control-Allow-Origin', window.location.origin).set(
                'Access-Control-Allow-Credentials',
                'true'
            );
        }

        if (options.withCredentials) {
            req.withCredentials();
        }

        if (query) {
            req.query(query);
        }

        if (setRequestBody) {
            setRequestBody(req, body, options);
        } else {
            req.send(body);
        }

        if (options.onProgress) {
            req.on('progress', options.onProgress);
        }

        try {
            const res = await req;
            const result = res.type?.startsWith('text/') ? res.text : res.body;

            if (this.onReceived) {
                await this.onReceived(url, result);
            }

            return result;
        } catch (error) {
            if (error.response && error.response.body) {
                if (this.onReponseError) {
                    return this.onReponseError(error.response.body, error);
                }

                throw error;
            }

            if (this.onOtherError) {
                return this.onOtherError(error);
            }

            throw error;
        }
    }

    _createRequest(httpMethod, url) {
        return this.agent[httpMethod](url);
    }
}

export default HttpClient;
