import { Runtime } from '@genx/react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

Runtime.register('navigation:bottomTabMaterial', createMaterialBottomTabNavigator);
Runtime.register('navigation:bottomTab', createMaterialBottomTabNavigator, true);
