import React, { useMemo } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import renderIt from '../hoc/renderIt';
import locationPathToNodes from '../utils/locationPathToNodes';

const { SubMenu } = Menu;

const menuItem = (path, icon, menuProps, exact, formatPathText) => {
    const text = formatPathText(path);

    const inner = (
        <>
            <span>{text}</span>
        </>
    );

    return (
        <Menu.Item key={path} icon={renderIt(icon)} title={text} {...menuProps}>
            <NavLink to={path} exact={exact}>
                {inner}
            </NavLink>
        </Menu.Item>
    );
};

const makeMenuItems = (routes, formatPathText) => {
    const nodePathes = {};

    return [
        routes.map(({ path, icon, showInMenu, subRoutes, menuProps, exact }) => {
            if (!showInMenu) {
                return false;
            }

            nodePathes[path] = exact;

            if (subRoutes) {
                return (
                    <SubMenu
                        key={path}
                        icon={renderIt(icon)}
                        title={<span>{formatPathText(path)}</span>}
                        {...menuProps}
                    >
                        {makeMenuItems(subRoutes, formatPathText)}
                    </SubMenu>
                );
            }

            return menuItem(path, icon, menuProps, exact, formatPathText);
        }),
        nodePathes,
    ];
};

const SideMenu = ({ sitemap, formatPathText, ...props }) => {
    const location = useLocation();
    const [menuItems, nodePathes] = useMemo(() => makeMenuItems(sitemap, formatPathText), [sitemap, formatPathText]);
    const allPossibleNodes = locationPathToNodes(location.pathname);

    const nodes = allPossibleNodes.filter((link, i) => {
        if (link in nodePathes) {
            return !nodePathes[link] || i === 0;
        }

        return false;
    });

    return (
        <Menu defaultSelectedKeys={nodes} defaultOpenKeys={nodes.length > 1 ? nodes.slice(1) : nodes} {...props}>
            {menuItems}
        </Menu>
    );
};

export default SideMenu;
