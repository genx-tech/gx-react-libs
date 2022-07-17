import { useCallback, useState, useRef } from 'react';
import useMountedChecker from './useMountedChecker';

/**
 * React hook that returns state and a callback for an async function or a function that returns a promise. Just like an async version of useCallback.
 * @param {*} fn - Async function
 * @param {Array} deps
 * @param {boolean} [loadingState=false]
 */
export default function useAsyncCallback(fn, deps, initialState, reloadable) {
    const [changed, setChanged] = useState(false);
    const lastCallId = useRef(0);
    const isMounted = useMountedChecker();
    const [state, setState] = useState(() => {
        const init = { progress: 0, loading: false, ...initialState };
        if (reloadable) {
            init.reload = () => setChanged((prev) => !prev);
        }
        return init;
    });
    const applyChange = useCallback(
        (payload) => {
            setState((prevState) => ({ ...prevState, ...payload }));
        },
        [setState]
    );

    if (reloadable) {
        deps = deps.concat(changed);
    }

    const callback = useCallback(
        (...args) => {
            const callId = ++lastCallId.current;
            setState((prevState) => ({
                ...prevState,
                progress: 0,
                loading: true,
                error: undefined,
            }));

            fn(...args)
                .then((value) => {
                    isMounted() &&
                        callId === lastCallId.current &&
                        setState((prevState) => ({
                            ...prevState,
                            value,
                            progress: 100,
                            loading: false,
                            error: undefined,
                        }));

                    return value;
                })
                .catch((error) => {
                    isMounted() &&
                        callId === lastCallId.current &&
                        setState((prevState) => ({
                            ...prevState,
                            error,
                            loading: false,
                        }));

                    return error;
                });
        },
        /* eslint-disable react-hooks/exhaustive-deps */
        deps
        /* eslint-enable react-hooks/exhaustive-deps */
    );

    return [state, callback, applyChange];
}
