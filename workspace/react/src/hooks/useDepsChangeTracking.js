import { useEffect, useMemo } from 'react';
import usePrevious from './usePrevious';

const useDepsChangeTracking = (dependencies, dependencyNames = []) => {
    const previousDeps = usePrevious(dependencies, []);

    const changedDeps = dependencies.reduce((accum, dependency, index) => {
        if (dependency !== previousDeps[index]) {
            const keyName = dependencyNames[index] || index;
            return {
                ...accum,
                [keyName]: {
                    before: previousDeps[index],
                    after: dependency,
                },
            };
        }

        return accum;
    }, {});

    if (Object.keys(changedDeps).length) {
        console.log('%c [Deps changed] ', 'background: #ccc; color: #ff0000', changedDeps);
    }
};

export const useMemoDebugger = (hookBody, dependencies, dependencyNames) => {
    useDepsChangeTracking(dependencies, dependencyNames);

    return useMemo(hookBody, dependencies);
};

export const useEffectDebugger = (hookBody, dependencies, dependencyNames) => {
    useDepsChangeTracking(dependencies, dependencyNames);

    useEffect(hookBody, dependencies);
};

export default useDepsChangeTracking;
