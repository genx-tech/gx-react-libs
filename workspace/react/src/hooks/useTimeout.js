import { useEffect } from 'react';

export default function useTimeout(f, timeout) {
    timeout != null || (timeout = 1000);

    useEffect(() => {
        let timeoutHandle;

        const timeoutFn = () => {
            f();
            timeoutHandle = setTimeout(timeoutFn, timeout);
        };

        timeoutHandle = setTimeout(timeoutFn, timeout);

        return () => {
            if (timeoutHandle) {
                clearTimeout(timeoutHandle);
            }
        };
    }, [f, timeout]);
}
