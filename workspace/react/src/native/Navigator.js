import React from 'react';
import Runtime from '../Runtime';
import RegistryComponent from '../components/RegistryComponent';
import Icon from './Icon';

/*
For header options
https://reactnavigation.org/docs/native-stack-navigator#options
*/

const renderScreens = (Screen, registry, screens) =>
    screens.map(({ name, options, routes, initialParams, ...navProps }) => {
        const screenProps = {
            key: name,
            name,
        };

        if (options) {
            screenProps.options = buildOptions(registry, options);
        }

        if (initialParams) {
            screenProps.initialParams = initialParams;
        }

        return (
            <Screen {...screenProps}>
                {(props) =>
                    routes ? (
                        <Navigator {...props} {...navProps} registry={registry} routes={routes} />
                    ) : (
                        <RegistryComponent {...props} _registry={registry} _name={name} />
                    )
                }
            </Screen>
        );
    });

const populateFromRegistry = (props, registry, name) => {
    const factoryName = props[name];
    if (factoryName) {
        const factory = registry[factoryName];
        if (factory == null) {
            throw new Error(`Factory function "${factoryName}" for ${name} not found in the navigator registry.`);
        }

        props[name] = factory;
    }
};

const buildOptions = (registry, props) => {
    const _props = {
        ...props,
    };

    if (props.tabBarIcon) {
        _props.tabBarIcon = ({ focused, color, size }) =>
            props.tabBarIconFocused && focused ? (
                <Icon {...props.tabBarIconFocused} color={color} size={size} />
            ) : (
                <Icon {...props.tabBarIcon} color={color} size={size} />
            );
    }

    populateFromRegistry(_props, registry, 'headerTitle');
    populateFromRegistry(_props, registry, 'headerLeft');
    populateFromRegistry(_props, registry, 'headerRight');

    return _props;
};

const Navigator = ({ type = 'stack', registry, routes, screenOptions, ...props }) => {
    const Navigation = Runtime.require(`nav:${type}`)();
    const Screen = Navigation.Screen;
    const elScreens = renderScreens(Screen, registry, routes);
    screenOptions && (screenOptions = buildOptions(registry, screenOptions));

    return (
        <Navigation.Navigator {...props} screenOptions={screenOptions}>
            {elScreens}
        </Navigation.Navigator>
    );
};

export default Navigator;
