import { rootStyleSheet } from '@genx/stylex';

/**
 * Pass in primary theme and secondary theme and returns the theme changer trigger function
 * @param {*} primary
 * @param {*} secondary
 * @returns {Function}
 */
const makeStylexTheme = (primary, secondary) => {
    rootStyleSheet.setRootTheme(primary);
    if (secondary) {
        rootStyleSheet.setCustomTheme(secondary);
    }

    return (seconaryOn) => rootStyleSheet.toggleCustomTheme(seconaryOn);
};

export default makeStylexTheme;
