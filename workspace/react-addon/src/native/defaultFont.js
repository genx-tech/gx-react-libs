import React from 'react';
import { Text, TextInput, Platform } from 'react-native';
import applyFontGlobally from 'react-native-font-global';

export default function initialize(globalFontFamily, allowScaling) {
    if (Platform.OS === 'android') {
        const oldRender = Text.render;
        Text.render = function (...args) {
            const origin = oldRender.call(this, ...args);
            return React.cloneElement(origin, {
                style: [{ fontFamily: globalFontFamily }, origin.props.style],
            });
        };
    }

    applyFontGlobally(globalFontFamily);

    if (allowScaling != null) {
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;

        TextInput.defaultProps = TextInput.defaultProps || {};
        TextInput.defaultProps.allowFontScaling = false;
    }
}
