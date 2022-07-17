import React from 'react';
import { Box } from '@mui/material';

const createSvgIconSet = (urlBuilder) => {
    const SvgIcon = ({ name, color = 'inherit', size = 24, style }) => {
        const src = urlBuilder(name);

        return (
            <Box
                component="span"
                sx={{
                    width: size,
                    height: size,
                    mask: `url(${src}) no-repeat center / contain`,
                    WebkitMask: `url(${src}) no-repeat center / contain`,
                    bgcolor: `${color}`,
                    ...(color === 'inherit' && { bgcolor: 'currentColor' }),
                    ...style,
                }}
            />
        );
    };

    return SvgIcon;
};

export default createSvgIconSet;
