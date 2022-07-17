import React from 'react';

export default function renderIt(anything) {
    if (anything) {
        if (React.isValidElement(anything)) {
            return anything;
        }

        const AnyComponent = anything;
        return <AnyComponent />;
    }

    return false;
}
