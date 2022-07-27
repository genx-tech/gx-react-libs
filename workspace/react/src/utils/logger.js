export const TRACE = -1;
export const DEBUG = 1;
export const VERBOSE = 2;
export const INFO = 3;
export const WARNING = 4;
export const ERROR = 5;

let logLevel = INFO;

const mapLogLevels = {
    debug: DEBUG,
    verbose: VERBOSE,
    info: INFO,
    warning: WARNING,
    warn: WARNING,
    error: ERROR,
    disable: ERROR + 1,
};

const levelText = ['unknown', 'debug', 'verbose', 'info', 'warning', 'error', 'disable'];

export const getLogLevel = () => logLevel;

export const setLogLevel = (level) => (logLevel = mapLogLevels[level]);

export const makeLogger = (logger) => (level, logInfoProducer) => {
    const enabledLogLevel = mapLogLevels[level] >= logLevel ? mapLogLevels[level] : 0;

    if (enabledLogLevel) {
        let args = typeof logInfoProducer === 'function' ? logInfoProducer() : logInfoProducer;
        Array.isArray(args) || (args = [args]);

        logger(enabledLogLevel, args);
    }
};

export const consoleLogger = (level, args) =>
    (level > WARNING
        ? console.error
        : level === WARNING
        ? console.warn
        : level === DEBUG
        ? console.trace
        : console.log)(`[${levelText[level]}]`, ...args);
