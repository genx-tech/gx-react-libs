import { useMemo, useState } from 'react';
import useSafeLayoutEffect from './useSafeLayoutEffect';

const defaultState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};

function useDimension() {
    const [element, ref] = useState(null);
    const [rect, setRect] = useState(defaultState);

    const observer = useMemo(
        () =>
            window.ResizeObserver &&
            new window.ResizeObserver((entries) => {
                if (entries[0]) {
                    const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
                    setRect({ x, y, width, height, top, left, bottom, right });
                }
            }),
        []
    );

    useSafeLayoutEffect(() => {
        if (!element) {
            return;
        }

        if (observer) {
            observer.observe(element);
            return () => {
                observer.disconnect();
            };
        }
    }, [element]);

    return [ref, rect];
}

export default useDimension;
