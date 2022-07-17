import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

//swr
import { SWRConfig } from 'swr';

import I18nProvider from '../i18n/I18nProvider';
import Runtime, { AppContext } from '../Runtime';

const initialValues = { themeMode: 'light', themeDirection: 'ltr', themeColor: 'default' };

/**
 *
 * @param {object} props
 * @property {object} [props.iconFamilies] - Icon set
 * @property {object} [props.themeMode] - Theme mode
 * @returns
 */

const WebAppContainer = ({ locale, localeLoader, onClientReady, onLocaleChange, children, ...contextValue }) => {
    Runtime.log('verbose', '---------- App renderred/updated ----------');

    useEffect(() => {
        onClientReady && onClientReady();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        onLocaleChange && onLocaleChange(locale);
    }, [locale, onLocaleChange]);

    return (
        <AppContext.Provider value={{ ...initialValues, ...contextValue, locale }}>
            <SWRConfig value={Runtime.swrConfig}>
                <I18nProvider locale={locale} loader={localeLoader}>
                    {children}
                </I18nProvider>
            </SWRConfig>
        </AppContext.Provider>
    );
};

export default observer(WebAppContainer);
