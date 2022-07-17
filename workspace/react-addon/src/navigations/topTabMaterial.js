import { Runtime } from '@genx/react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

Runtime.register('navigation:topTabMaterial', createMaterialTopTabNavigator);
Runtime.register('navigation:topTab', createMaterialTopTabNavigator, true);
