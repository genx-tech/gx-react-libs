import { Runtime } from '@genx/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

Runtime.register('navigation:bottomTabNative', createBottomTabNavigator);
Runtime.register('navigation:bottomTab', createBottomTabNavigator);
