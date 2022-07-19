import { Runtime } from '@genx/react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

Runtime.register('nav:bottomTabMaterial', createMaterialBottomTabNavigator);
Runtime.register('nav:bottomTab', createMaterialBottomTabNavigator, true);
