/**
 * @module ReactNativeRuntime
 */

import React from 'react';
import RuntimeCore from './helpers/Runtime';

export const AppContext = React.createContext({});

class ReactRuntime extends RuntimeCore {
    screenComposers = [];

    useScreen = (hoc) => this.screenComposers.push(hoc);
    setupScreens = (children) =>
        this.screenComposers
            .concat()
            .reverse()
            .reduce((r, hoc) => (r = hoc(r)), children);

    finalize() {
        super.finalize();

        if (this.isDevMode) {
            Object.freeze(this.screenComposers);
        }
    }
}

const Runtime = new ReactRuntime();

export default Runtime;
