/**
 * @module ReactRuntime
 */

import { makeLogger, consoleLogger, getLogLevel, setLogLevel } from '../utils/logger';
import swrConfig from './swrConfig';

const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

if (isDevMode) {
    setLogLevel('verbose');
}

/**
 * @class
 */
class Runtime {
    isDevMode = isDevMode;
    warnMissingTranslation = false;
    config = {};
    modulesRegistry = {};
    events = {};
    swrConfig = swrConfig;

    // getter/setter of dynamic objects
    require(moduleName) {
        return this.modulesRegistry[moduleName];
    }

    register(moduleName, loadedModule, asDefaultOnly) {
        if (!asDefaultOnly || !(moduleName in this.modulesRegistry)) {
            this.modulesRegistry[moduleName] = loadedModule;
        }
    }

    getObject(objectName) {
        return this.require(`obj:${objectName}`);
    }

    registerObject(objectName, objectInstance) {
        this.register(`obj:${objectName}`, objectInstance);
    }

    getComponent(componentName) {
        return this.require(`rc:${componentName}`);
    }

    registerComponent(componentName, component) {
        this.register(`rc:${componentName}`, component);
    }

    getCreator(objectName) {
        return this.require(`create:${objectName}`);
    }

    registerCreator(objectName, creatorFunction) {
        this.register(`create:${objectName}`, creatorFunction);
    }

    // simple event dispatcher
    onEvent(eventName, handler) {
        const bucket = this.events[eventName];

        if (bucket) {
            if (this.isDevMode) {
                if (bucket.indexOf(handler) !== -1) {
                    throw new Error(`Duplicate handler for event "${eventName}".`);
                }
            }

            bucket.push(handler);
        } else {
            this.events[eventName] = [handler];
        }
    }

    removeEvent(eventName, handler) {
        const bucket = this.events[eventName];

        if (bucket) {
            const pos = bucket.indexOf(handler);
            if (pos > -1) {
                this.events[eventName].splice(pos, 1);
                return;
            }
        }

        if (this.isDevMode) {
            throw new Error(`Handler to remove is not found for event "${eventName}".`);
        }
    }

    dispatchEvent(eventName, ...args) {
        const bucket = this.events[eventName];
        bucket?.forEach((handler) => handler(...args));
    }

    // logger related
    log = makeLogger(consoleLogger);
    getLogLevel = getLogLevel;
    setLogLevel = setLogLevel;

    // updater
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
        // some finilization work to get the runtime ready, if any in the future

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
