import React from 'react';

const useSafeLayoutEffect =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
        ? React.useLayoutEffect
        : React.useEffect;

export default useSafeLayoutEffect;
