import React, { useEffect, useRef } from 'react';
import { AppRegistry } from 'react-native-web';

let idCounter = 0;

export default function NativeView({ component, ...props }) {
    const myCounter = useRef(null);
    if (myCounter.current == null) {
        myCounter.current = `gx_nv${idCounter}`;
        idCounter++;
        // myCounter.current used below will appear +1 larger than expected, not sure why
        // even though, log output here is correct, to follow up
    }

    useEffect(
        () => {
            const rootTag = document.getElementById(myCounter.current);

            AppRegistry.registerComponent(myCounter.current, () => component);
            AppRegistry.runApplication(myCounter.current, {
                ...props,
                rootTag,
            });

            return () => {
                AppRegistry.unmountApplicationComponentAtRootTag(rootTag);
            };
        },
        /* eslint-disable react-hooks/exhaustive-deps */
        [props]
        /* eslint-enable react-hooks/exhaustive-deps */
    );

    return <div id={myCounter.current} />;
}
