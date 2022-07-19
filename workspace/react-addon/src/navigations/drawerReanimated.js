import { Runtime } from '@genx/react';
import { createDrawerNavigator } from '@react-navigation/drawer';

Runtime.register('nav:drawerReanimated', createDrawerNavigator);
Runtime.register('nav:drawer', createDrawerNavigator, true);
