import React from 'react';
import { Icon } from 'react-native-elements';
import useAppContext from '../hooks/useAppContext';
import Runtime from '../Runtime';

function IconEx({ type, ...rest }) {
    const appContext = useAppContext();

    if (type.startsWith('x-')) {
        if (!appContext.iconFamilies) {
            Runtime.log('error', 'Missing "iconFamilies" in app context!');
            return null;
        }

        type = type.substr(2);
        const CustomIcon = appContext.iconFamilies[type];
        return <CustomIcon {...rest} />;
    }

    return <Icon type={type} {...rest} />;
}

export default IconEx;
