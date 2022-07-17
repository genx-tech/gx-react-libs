const makeMuiTheme = (themeConfig) => {
    const palette = {};

    if (themeConfig.colorPrimary) {
        palette.primary = {
            main: themeConfig.colorPrimary,
        };
    }

    if (themeConfig.colorSecondary) {
        palette.secondary = {
            main: themeConfig.colorSecondary,
        };
    }

    if (themeConfig.colorInfo) {
        palette.info = {
            main: themeConfig.colorInfo,
        };
    }

    if (themeConfig.colorSuccess) {
        palette.success = {
            main: themeConfig.colorSuccess,
        };
    }

    if (themeConfig.colorWarning) {
        palette.warning = {
            main: themeConfig.colorWarning,
        };
    }

    if (themeConfig.colorError) {
        palette.error = {
            main: themeConfig.colorError,
        };
    }

    const theme = {
        palette,
    };

    return theme;
};

export default makeMuiTheme;
