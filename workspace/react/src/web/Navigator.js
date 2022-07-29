import React, { useMemo, useEffect } from 'react';
import { useRoutes, Navigate, useLocation } from 'react-router-dom';
import { join as urlJoin } from '@genx/july';
import RegistryComponent from '../components/RegistryComponent';

const createRoutes = (registry, routes, parentPath = '/') => {
    let hasIndex = false;

    const elRoutes = routes.map((node) => {
        if (node.path === '/') {
            hasIndex = true;
        }

        const { layout, ...otherInfo } = node;

        if (layout) {
            if (!otherInfo.routes) {
                otherInfo.routes = [
                    {
                        ...otherInfo,
                        path: '/',
                    },
                ];
                otherInfo.initialPath = '/';
            }
        }

        if (otherInfo.routes) {
            const basePath = urlJoin(parentPath, otherInfo.path);
            const [elSubNodes, subNodesHasIndex] = createRoutes(registry, otherInfo.routes, basePath);

            if (!subNodesHasIndex && otherInfo.initialPath) {
                elSubNodes.unshift({
                    index: true,
                    element: <Navigate to={urlJoin(basePath, otherInfo.initialPath)} replace />,
                });
            }

            const subRoute = {
                path: otherInfo.path,
                children: elSubNodes,
            };

            if (layout) {
                subRoute.element = <RegistryComponent _registry={registry} _name={node.layout} />;
            }

            return subRoute;
        }

        const pathInfo = node.path === '/' && parentPath !== '/' ? { index: true } : { path: node.path };

        if (node.redirectTo) {
            const extra = node.replace ? { replace: true } : null;

            return {
                ...pathInfo,
                element: <Navigate to={node.redirectTo} {...extra} />,
            };
        }

        return {
            ...pathInfo,
            element: <RegistryComponent _registry={registry} _name={node.name || node.component} />,
        };
    });

    return [elRoutes, hasIndex];
};

export const Navigator = ({ registry, routes, initialPath, actions }) => {
    const { pathname } = useLocation();

    const elRoutes = useMemo(() => {
        const [nodes, hasIndex] = createRoutes(registry, routes);

        if (!hasIndex && initialPath) {
            nodes.push({ path: '/', element: <Navigate to={initialPath} replace /> });
        }

        return nodes;
    }, [registry, routes, initialPath]);

    useEffect(() => {
        const action = actions && actions[pathname];
        if (action) {
            action();
        }
    }, [actions, pathname]);

    return useRoutes(elRoutes);
};

export default Navigator;
