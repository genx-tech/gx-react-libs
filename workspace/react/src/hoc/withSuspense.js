import React, { Suspense } from 'react';
import Runtime from '../Runtime';

export default (Component) =>
    ({ fallback, ...props }) =>
        (
            <Suspense fallback={fallback || Runtime.suspenseFallbabck()}>
                <Component {...props} />
            </Suspense>
        );
