import React from 'react';
export default (config) => {
    return (Component) => {
        const WithClasses = (props) => {
            const { children, classes } = props;
            const modifiedChildren = React.Children.map(children, childNode => {
                if (!React.isValidElement(childNode)) {
                    return childNode;
                }
                let childResult = childNode;
                config(classes).forEach(([componentType, configClasses]) => {
                    if (childNode.type === componentType) {
                        childResult = React.cloneElement(childNode, {
                            classes: configClasses
                        });
                    }
                });
                return childResult;
            });
            // eslint-disable-next-line react/jsx-props-no-spreading
            return React.createElement(Component, Object.assign({}, props), modifiedChildren);
        };
        WithClasses.displayName = Component.displayName || Component.name;
        return WithClasses;
    };
};
//# sourceMappingURL=withClasses.js.map