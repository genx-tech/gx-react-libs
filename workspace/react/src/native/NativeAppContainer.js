import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

//swr
import { SWRConfig } from 'swr';

import Runtime, { AppContext } from '../Runtime';
import I18nProvider from '../i18n/I18nProvider';

const AppContainer = ({ locale, localeLoader, iconFamilies, children, ...props }) => {
    const elMainScreen = useMemo(() => Runtime.setupScreens(children), [children]);
    const elWrapped = useMemo(() => Runtime.setupProviders(elMainScreen), [elMainScreen]);

    return (
        <AppContext.Provider value={{ iconFamilies }}>
            <SWRConfig value={Runtime.swrConfig}>
                <I18nProvider locale={locale} loader={localeLoader}>
                    <SafeAreaProvider>
                        <NavigationContainer {...props}>{elWrapped}</NavigationContainer>
                    </SafeAreaProvider>
                </I18nProvider>
            </SWRConfig>
        </AppContext.Provider>
    );
};

export default AppContainer;
