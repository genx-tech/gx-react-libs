import Runtime from '../Runtime';

export default (styles, styleMode) => (Component) => {
    styleMode != null || (styleMode = Runtime.defaultStyleMode);
    const withStyles = Runtime[`${styleMode}Styles`];

    if (typeof withStyles === 'function') {
        return withStyles(Component, styles);
    }

    return Component;
};
