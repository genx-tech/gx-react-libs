import { Runtime } from '@genx/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

Runtime.register('navigation:stackNative', createNativeStackNavigator);
Runtime.register('navigation:stack', createNativeStackNavigator);
