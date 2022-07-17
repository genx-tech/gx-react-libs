import { useEffect, useRef, useMemo } from 'react';

/**
 * React hook that debounce an function call.
 * lodash debounce has been observed that sometimes the debounced handler is never invoked after wait/maxWait period
 * rewrite with hooks
 * @param {Function} fn
 * @param {integer} [wait=2000] - Wait milliseconds after last invoke
 * @return {Function} Debounced function
 */
export default function useDebounceCallback(fn, wait) {
    wait != null || (wait = 2000);

    const timer = useRef(null);

    const debounced = useMemo(() => {
        if (timer.current) {
            //whenever deps changes, reset the timer
            clearTimeout(timer.current);
            timer.current = null;
        }

        return (...args) => {
            if (!timer.current) {
                fn(...args);
                timer.current = setTimeout(() => {
                    timer.current = null;
                }, wait);
            }
            //else ignored within waiting period
        };
    }, [fn, wait]);

    //clear timer on unmounting
    useEffect(() => () => timer.current && clearTimeout(timer.current), []);

    return debounced;
}
