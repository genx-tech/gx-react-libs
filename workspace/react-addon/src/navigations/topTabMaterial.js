import { Runtime } from '@genx/react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

Runtime.register('nav:topTabMaterial', createMaterialTopTabNavigator);
Runtime.register('nav:topTab', createMaterialTopTabNavigator, true);
