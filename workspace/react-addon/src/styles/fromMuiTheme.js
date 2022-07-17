const fromMuiTheme = (theme) => {
    const { palette } = theme;

    return {
        colorPrimary: palette.primary.main,
        colorTextPrimary: palette.text.primary,
        colorSecondary: palette.secondary.main,
        colorTextSecondary: palette.text.secondary,
        colorInfo: palette.info.main,
        colorSuccess: palette.success.main,
        colorWarning: palette.warning.main,
        colorError: palette.error.main,
    };
};

export default fromMuiTheme;
