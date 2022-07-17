import { useCallback, useEffect } from 'react';
import useAsyncCallback from './useAsyncCallback';

/**
 * React hook that returns a state with shape { value, error, loading } of which the value is returned by an async function. Just like async version of useMemo.
 * @param {*} fn
 * @param {*} deps
 */
export default function useAsyncProgress(fn, deps, reloadable) {
    const [state, callback, applyChange] = useAsyncCallback(fn, deps, { loading: true }, reloadable);
    const setProgress = useCallback(
        (progress) => {
            applyChange({ progress });
        },
        [applyChange]
    );

    useEffect(() => {
        callback(setProgress);
    }, [callback, setProgress]);

    return state;
}
