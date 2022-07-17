import React from 'react';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { Runtime } from '@genx/react';

Runtime.register('flash-message', { showMessage, hideMessage });

export default function initialize(props) {
    Runtime.composeScreen((elScreen) => (
        <>
            {elScreen}
            <FlashMessage position={props.position || 'top'} />
        </>
    ));
}
