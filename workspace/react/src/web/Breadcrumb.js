import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import buildQuery from '../utils/buildQuery';

const BreadcrumbBar = ({ formatPathText, customLinks, ...props }) => {
    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter((i) => i);

    let linkPath = '';
    const maxNodeIndex = pathSnippets.length - 1;

    const breadcrumbItems = [
        <Breadcrumb.Item key={'/'}>
            <Link to="/">{formatPathText('/')}</Link>
        </Breadcrumb.Item>,
    ].concat(
        pathSnippets.map((node, i) => {
            linkPath += '/' + node;

            let label = formatPathText(linkPath);

            let linkUrl = linkPath;

            if (i < maxNodeIndex && customLinks) {
                const customLink = customLinks[linkPath];
                if (customLink) {
                    if (customLink.link) {
                        linkUrl = customLink.link;
                    }

                    if (customLink.params) {
                        linkUrl += '?' + buildQuery(customLink.params);
                    }
                }
            }

            return (
                <Breadcrumb.Item key={linkPath}>
                    {i === pathSnippets.length - 1 ? label : <Link to={linkUrl}>{label}</Link>}
                </Breadcrumb.Item>
            );
        })
    );

    return <Breadcrumb {...props}>{breadcrumbItems}</Breadcrumb>;
};

export default BreadcrumbBar;
