import React, { Suspense } from 'react';
import Runtime from '../Runtime';

const withSuspense =
    (Component) =>
    ({ fallback, ...props }) =>
        (
            <Suspense fallback={fallback || Runtime.suspenseFallbabck()}>
                <Component {...props} />
            </Suspense>
        );

export default withSuspense;
