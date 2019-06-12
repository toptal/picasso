"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.screens = function (...sizes) {
    const { sm, md, lg } = breakpoints.values;
    const mediaQueries = {
        small: `(max-width: ${sm}px)`,
        medium: `(min-width: ${sm}px) and (max-width: ${md}px)`,
        large: `(min-width: ${md}px) and (max-width: ${lg}px)`,
        'extra-large': `(min-width: ${lg}px)`
    };
    return `@media ${sizes.map(size => mediaQueries[size]).join(', ')}`;
};
exports.isScreenSize = function (size, currentSize) {
    const { sm, md, lg, xl } = breakpoints.values;
    const breakPointBoundaries = {
        small: (width) => width < sm,
        medium: (width) => width >= md && width < lg,
        large: (width) => width >= lg && width < xl,
        'extra-large': (width) => width >= xl
    };
    return breakPointBoundaries[size](currentSize || window.innerWidth);
};
exports.useScreenSize = () => {
    const [size, setSize] = react_1.useState(window.innerWidth);
    const updateSize = () => setSize(window.innerWidth);
    react_1.useEffect(() => {
        window.onresize = updateSize;
        return () => {
            window.onresize = null;
        };
    }, []);
    return size;
};
const breakpoints = {
    values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1920
    }
};
exports.breakpointsList = {
    small: breakpoints.values.sm,
    medium: breakpoints.values.md,
    large: breakpoints.values.lg,
    'extra-large': breakpoints.values.xl
};
exports.default = breakpoints;
//# sourceMappingURL=breakpoints.js.map