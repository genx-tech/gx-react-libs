import { useEffect } from 'react';
import useIsFirstMount from './useIsFirstMount';

export default function useUpdateEffect(effect, deps) {
    const isFirstMount = useIsFirstMount();

    useEffect(
        () => {
            if (!isFirstMount) {
                return effect();
            }
        },
        /* eslint-disable react-hooks/exhaustive-deps */
        deps
        /* eslint-enable react-hooks/exhaustive-deps */
    );
}
