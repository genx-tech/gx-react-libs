import { Runtime } from '@genx/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

Runtime.register('nav:stackNative', createNativeStackNavigator);
Runtime.register('nav:stack', createNativeStackNavigator);
