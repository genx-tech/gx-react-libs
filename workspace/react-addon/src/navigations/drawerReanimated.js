import { Runtime } from '@genx/react';
import { createDrawerNavigator } from '@react-navigation/drawer';

Runtime.register('navigation:drawerReanimated', createDrawerNavigator);
Runtime.register('navigation:drawer', createDrawerNavigator, true);
