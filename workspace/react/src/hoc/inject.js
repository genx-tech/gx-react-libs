import React from 'react';

const inject = (injectProps) => (Component) => (props) =>
    <Component {...props} {...(typeof injectProps === 'function' ? injectProps(props) : injectProps)} />;

export default inject;
