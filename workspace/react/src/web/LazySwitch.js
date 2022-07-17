import React, { lazy, Suspense, useState } from 'react';
import { Runtime } from '@genx/react';
import { observer } from 'mobx-react-lite';

const LazySwitch = ({ observable, loadingView, importTable }) => {
    const [fallback] = useState(loadingView ?? Runtime.require('loader:View'));
    const elComponent = lazy(importTable[observable]);

    return <Suspense fallback={fallback}>{elComponent}</Suspense>;
};

export default observer(LazySwitch);
