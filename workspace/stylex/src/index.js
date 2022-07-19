import { rootStyleSheet as _rootStyleSheet } from './CometStyleXSheet';

export const rootStyleSheet = _rootStyleSheet;

_rootStyleSheet.injectTheme();

function mc(array) {
    let mixed = {};

    array.forEach((c) => {
        const it = Array.isArray(c) ? mc(c) : c;

        if (it) {
            const tp = typeof it;
            if (tp === 'string') {
                // [ "hidden" ] =>  { "[hidden]": "hidden" }
                mixed[`[${it}]`] = it;
            } else if (tp === 'object') {
                // [ { borderWidth: 'classname1', borderStyle: 'classname2'} ]
                mixed = { ...mixed, ...it };
            }
        }
    });

    return mixed;
}

function ms(array) {
    let mixed = {};

    array.forEach((c) => {
        const it = Array.isArray(c) ? ms(c) : c;

        if (it && typeof it === 'object') {
            mixed = { ...mixed, ...it };
        }
    });

    return mixed;
}

function stylex(...args) {
    const mixed = mc(args);

    return Object.values(mixed)
        .filter((cn) => cn != null)
        .join(' ');
}

/**
 * Compose multiple inline styles object into one.
 * */
stylex.inline = function (...args) {
    return ms(args);
};

/**
 * Inject compiled styles to css stylesheet if need (if it's never injected before).
 * */
stylex.inject = function (a) {
    _rootStyleSheet.insert(a);
};

/** ...................
 * Create an stylex object, this is done by compiled and will caused error
 * if it exits in runtime code.
 *
 * E.g:
 * const styles = stylex.create({
 *     button: {
 *         color: "var(--accent)",
 *         backgroundColor: "var(--secondary-color)",
 *         ...
 *     },
 * })
 *
 * */
stylex.create = function () {
    throw new Error('stylex.create should never be called. It should be compiled away.');
};

/**
 * Create a keyframes animation
 * e.g:
 * const styles = stylex.create({
 *     root: {
 *         position: "relative",
 *         animationName: stylex.keyframes({
 *               '0%': {
 *                   transform: 'translateY(0)'
 *               },
 *               '28%': {
 *                   transform: 'translateY(-5px)'
 *               },
 *               '44%': {
 *                   transform: 'translateY(0)',
 *               },
 *           })
 *     }
 * })
 * => will be transformed to:
 * ...animationName: "sdert25s", <== animation name
 * and an keyframes animation with name "sdert25s".
 * */
stylex.keyframes = function () {
    throw new Error('stylex.keyframes should never be called. It should be compiled away.');
};

export default stylex;
