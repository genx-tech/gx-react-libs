import React from 'react';
import { View, StyleSheet } from 'react-native';

function Block(props) {
    const {
        row,
        reverse,
        flex,
        center,
        middle,
        top,
        bottom,
        right,
        left,
        space,
        fluid,
        height,
        width,
        children,
        style,
        ...rest
    } = {
        row: false,
        reverse: false,
        flex: false,
        center: false,
        middle: false,
        top: false,
        bottom: false,
        right: false,
        left: false,
        space: null,
        fluid: false,
        height: null,
        width: null,
        ...props,
    };

    const styleBlock = [
        reverse ? styles.blockReverse : styles.block,
        row && (reverse ? styles.rowReverse : styles.row),
        flex && { flex: flex === true ? 1 : flex },
        center && styles.center,
        middle && styles.middle,
        top && styles.top,
        bottom && styles.bottom,
        right && styles.right,
        left && styles.left,
        space && { justifyContent: `space-${space}` },
        fluid && styles.fluid,
        height && { height },
        width && { width },
        style,
    ];

    return (
        <View style={styleBlock} {...rest}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
    },
    blockReverse: {
        flexDirection: 'column-reverse',
    },
    row: {
        flexDirection: 'row',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    top: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    bottom: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    fluid: {
        width: 'auto',
    },
});

export default Block;
