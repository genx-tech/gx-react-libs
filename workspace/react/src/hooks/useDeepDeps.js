import { useRef } from 'react';
import isDeepEqual from '../utils/isDeepEqual';

/**
 * Check component's mount state.
 * Returns a function that will return true if component mounted and false otherwise.
 */
export default function useDeepDeps(nextDeps) {
    const deps = useRef(undefined);

    if (!deps.current || nextDeps == null || !isDeepEqual(nextDeps, deps.current)) {
        deps.current = nextDeps;
    }

    return deps.current;
}
