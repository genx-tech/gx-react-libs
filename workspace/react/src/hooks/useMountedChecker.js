import { useEffect, useRef } from 'react';

/**
 * Check component's mount state.
 * Returns a function that will return true if component mounted and false otherwise.
 */
export default function useMountedChecker() {
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        //unmount
        return () => {
            mounted.current = false;
        };
    }, []);

    return () => mounted.current;
}
