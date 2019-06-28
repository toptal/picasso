"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const addClass = (Component, classes) => {
    return react_1.default.cloneElement(Component, { classes });
};
exports.default = (config) => {
    return (Component) => {
        const withClasses = (props) => {
            const { children, classes } = props;
            const modifiedChildren = react_1.default.Children.map(children, childNode => {
                let childResult = childNode;
                config(classes).forEach(([ComponentType, classes]) => {
                    if (childNode.type === ComponentType) {
                        childResult = addClass(childNode, classes);
                    }
                });
                return childResult;
            });
            // eslint-disable-next-line react/jsx-props-no-spreading
            return react_1.default.createElement(Component, Object.assign({}, props), modifiedChildren);
        };
        withClasses.displayName = Component.displayName || Component.name;
        return withClasses;
    };
};
//# sourceMappingURL=withClasses.js.map