import React from 'react';
const withDeprecationWarning = (oldName, newName) => function withDeprecationWarningInner(NewComponent) {
    const newComponent = (props) => {
        React.useEffect(() => {
            window.console.warn(`
'${oldName}' component is deprecated and will be
removed in the next major release of Picasso.
Please use '${newName}' instead.
          `.trim());
        }, []);
        // eslint-disable-next-line react/jsx-props-no-spreading
        return React.createElement(NewComponent, Object.assign({}, props));
    };
    return newComponent;
};
withDeprecationWarning.displayName = 'withDepractionWarning';
export default withDeprecationWarning;
//# sourceMappingURL=with-deprecation-warning.js.map