/**
 * @module ReactRuntime
 */

import React from 'react';
import RuntimeCore from './helpers/Runtime';

export const AppContext = React.createContext();

const Runtime = new RuntimeCore();

export default Runtime;
