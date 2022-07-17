import { useEffect } from 'react';
import useAsyncCallback from './useAsyncCallback';

/**
 * React hook that returns a state with shape { value, error, loading } of which the value is returned by an async function. Just like async version of useMemo.
 * @param {*} fn
 * @param {*} deps
 */
export default function useAsyncMemo(fn, deps, reloadable) {
    const [state, callback] = useAsyncCallback(fn, deps, { loading: true }, reloadable);

    useEffect(() => {
        callback();
    }, [callback]);

    return state;
}
