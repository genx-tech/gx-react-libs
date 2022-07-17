/**
 * @module ReactRuntime
 */

import { makeLogger, consoleLogger, getLogLevel, setLogLevel } from '../utils/logger';
import swrConfig from './swrConfig';

const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

if (isDevMode) {
    setLogLevel('verbose');
}

class Runtime {
    isDevMode = isDevMode;
    //warnMissingTranslation = false;
    config = {};
    modulesRegistry = {};
    swrConfig = swrConfig;

    //dynamic loading
    require = (moduleName) => this.modulesRegistry[moduleName];
    register = (moduleName, loadedModule, asDefaultOnly) => {
        if (!asDefaultOnly || !(moduleName in this.modulesRegistry)) {
            this.modulesRegistry[moduleName] = loadedModule;
        }
    };

    //logger related
    log = makeLogger(consoleLogger);
    getLogLevel = getLogLevel;
    setLogLevel = setLogLevel;

    //updater
    update(key, value) {
        if (typeof value === 'undefined' && typeof key === 'object') {
            Object.assign(this.config, key);
        } else {
            this.config[key] = value;
        }

        return this;
    }

    updateSwrConfig(extraConfig) {
        this.swrConfig = { ...this.swrConfig, ...extraConfig };
    }

    finalize() {
        //todo: some finilization work to get the runtime ready

        if (isDevMode) {
            this.log('debug', () => {
                const configKeys = Object.keys(this.config);
                const registryKeys = Object.keys(this.modulesRegistry);

                return `Config:\n  ${configKeys.join('\n  ')}\n\nRegistry:\n  ${registryKeys.join('\n  ')}`;
            });

            //all runtime configs are supposed to be unchanged during the whole app life cycle
            Object.freeze(this.config);
            Object.freeze(this.modulesRegistry);
            Object.freeze(this.swrConfig);
        }
    }
}

export default Runtime;
