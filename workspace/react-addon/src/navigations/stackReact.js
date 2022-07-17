import { Runtime } from '@genx/react';
import { createStackNavigator } from '@react-navigation/stack';

Runtime.register('navigation:stackReact', createStackNavigator);
Runtime.register('navigation:stack', createStackNavigator, true);
