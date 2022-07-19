import StylexSheet from './StyleXSheet';

class CometStyleXSheet extends StylexSheet {
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

export const rootStyleSheet = new CometStyleXSheet();

export default CometStyleXSheet;
