import { useContext } from 'react';
import { useIntl, defineMessages } from 'react-intl';

import { I18nContext } from './I18nProvider';
import passThrough from './passThrough';
import useSWR from 'swr';
import { template } from '@genx/july';

const templateSettings = {
    escape: false,
    evaluate: false,
    imports: false,
    interpolate: /{([\s\S]+?)}/g,
    variable: false,
};

/**
 * Features:
 *  Lazy locale loading, better performance for web app
 *  Messages grouped by modules
 *
 * @see {@link https://formatjs.io/docs/core-concepts/icu-syntax} for message syntax
 */

export const defaultTranslator = (msg, values) => (values == null ? msg : template(msg, values, templateSettings));

/**
 * Process a loaded locale module
 * @param {*} loader
 * @param {*} locale
 * @param {*} moduleName
 */
export const processLocale = (moduleName, loadedModule) => {
    const { messages } = loadedModule;
    const messagesWithId = {};

    if (messages) {
        for (let key in messages) {
            const msg = messages[key];
            const id = `${moduleName}.${key}`;

            //todo: be replaced with pre-compiled locale data
            messagesWithId[key] =
                typeof msg === 'string'
                    ? {
                          id,
                          defaultMessage: msg,
                      }
                    : {
                          ...msg,
                          id,
                      };
        }
    }

    return defineMessages(messagesWithId);
};

/**
 * Returns a translator { t = (text, variables) => <translated and injected text> } of specified locale module.
 * @param {string} [moduleName='default']
 * @returns {Object} { loading, t }
 */
export default function useI18n(moduleName = 'default', sourceView) {
    const { loader } = useContext(I18nContext);
    const intl = useIntl();
    const key = `${intl.locale}/${moduleName}`;

    const { data, error } = useSWR(
        key,
        async () => {
            const localeModule = await loader(intl.locale, moduleName);
            const messages = processLocale(moduleName, localeModule);
            const devT = passThrough(moduleName, sourceView);

            return (messageId, vars) => {
                if (messageId == null) {
                    return null;
                }

                let _msg = messages[messageId];
                if (_msg == null) {
                    _msg = devT(messageId);
                    if (vars) {
                        _msg = {
                            id: messageId,
                            defaultMessage: _msg,
                        };
                    } else {
                        return _msg;
                    }
                }

                if (vars) {
                    return intl.formatMessage(_msg, vars);
                }

                return _msg.defaultMessage;
            };
        },
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            refreshInterval: 0,
            shouldRetryOnError: false,
        }
    );

    return {
        error,
        loading: !error && !data,
        intl,
        T: data ?? defaultTranslator,
    };
}
