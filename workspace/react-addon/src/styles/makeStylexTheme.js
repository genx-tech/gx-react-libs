import CometStyleXSheet from '@genx/stylex-theme';

const makeStylexTheme = (primary, secondary) => {
    CometStyleXSheet.rootStyleSheet.setRootTheme(primary);
    if (secondary) {
        CometStyleXSheet.rootStyleSheet.setCustomTheme(secondary);
    }

    return (seconaryOn) => CometStyleXSheet.rootStyleSheet.toggleCustomTheme(seconaryOn);
};

export default makeStylexTheme;
