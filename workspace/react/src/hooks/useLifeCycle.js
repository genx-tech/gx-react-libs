import { useEffect } from 'react';
import useUpdateEffect from './useUpdateEffect';

/**
 * Effect handler for tracking a react component's life cycle.
 * @callback LifeCycleEffectHandler
 * @param {string} stage - The lift cycle stage: mounted, unmounted, updated
 */

/**
 *
 * @param {LiftCycleEffectHandler} fn
 */
export default function useLifeCycle(fn, ...payload) {
    useEffect(
        () => {
            fn('mounted', ...payload);
            return () => fn('unmounted', ...payload);
        },
        /* eslint-disable react-hooks/exhaustive-deps */
        []
        /* eslint-enable react-hooks/exhaustive-deps */
    );

    useUpdateEffect(() => {
        fn('updated', ...payload);
    });
}
