import { Runtime } from '@genx/react';
import { createStackNavigator } from '@react-navigation/stack';

Runtime.register('nav:stackReact', createStackNavigator);
Runtime.register('nav:stack', createStackNavigator, true);
