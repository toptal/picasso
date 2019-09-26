import React from 'react';
const addClass = (Component, classes) => {
    return React.cloneElement(Component, { classes });
};
export default (config) => {
    return (Component) => {
        const withClasses = (props) => {
            const { children, classes } = props;
            const modifiedChildren = React.Children.map(children, childNode => {
                let childResult = childNode;
                config(classes).forEach(([ComponentType, classes]) => {
                    if (childNode.type === ComponentType) {
                        childResult = addClass(childNode, classes);
                    }
                });
                return childResult;
            });
            // eslint-disable-next-line react/jsx-props-no-spreading
            return React.createElement(Component, Object.assign({}, props), modifiedChildren);
        };
        withClasses.displayName = Component.displayName || Component.name;
        return withClasses;
    };
};
//# sourceMappingURL=withClasses.js.map