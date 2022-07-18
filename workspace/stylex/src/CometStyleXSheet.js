import StylexSheet from './StyleXSheet';

class _CometStyleXSheet extends StylexSheet {
    constructor(props = {}) {
        super(props);

        this.rootTheme = props.rootTheme || {};
        this.customTheme = props.customTheme || {};

        this.injectThemeVariables = function (data, themeKey = 'root') {
            if (themeKey === 'root') {
                this.rootTheme = Object.assign(this.rootTheme, data);
            } else {
                this.customTheme = Object.assign(this.customTheme, data);
            }
        };
    }
}

const _rootStyleSheet = new _CometStyleXSheet();

export default {
    CometStyleXSheet: _CometStyleXSheet,
    rootStyleSheet: _rootStyleSheet,
};
