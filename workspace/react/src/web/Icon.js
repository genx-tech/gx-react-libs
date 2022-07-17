import React from 'react';
import Runtime from '../Runtime';
import useAppContext from '../hooks/useAppContext';

function Icon({ _registry, type, name, ...props }) {
    const appContext = useAppContext();

    if (type === 'x-registry') {
        const CachedIcon = _registry[name];
        if (!CachedIcon) {
            throw new Error(`Icon "${name}" not found in registry.`);
        }
        return <CachedIcon {...props} />;
    }

    if (type === 'x-image') {
        return <img src={name} {...props} />;
    }

    if (!appContext.iconFamilies) {
        Runtime.log('error', 'Missing "iconFamilies" in app context!');
        return null;
    }

    const CustomIcon = appContext.iconFamilies[type];
    return <CustomIcon name={name} {...props} />;
}

export default Icon;
