import { Runtime } from '@genx/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

Runtime.register('nav:bottomTabNative', createBottomTabNavigator);
Runtime.register('nav:bottomTab', createBottomTabNavigator);
