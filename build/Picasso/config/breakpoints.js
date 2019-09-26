import { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
export const screens = function (...sizes) {
    const { sm, md, lg } = breakpoints.values;
    const mediaQueries = {
        small: `(max-width: ${sm}px)`,
        medium: `(min-width: ${sm}px) and (max-width: ${md}px)`,
        large: `(min-width: ${md}px) and (max-width: ${lg}px)`,
        'extra-large': `(min-width: ${lg}px)`
    };
    return `@media ${sizes.map(size => mediaQueries[size]).join(', ')}`;
};
export const isScreenSize = function (size, currentSize) {
    const { sm, md, lg, xl } = breakpoints.values;
    const breakPointBoundaries = {
        small: (width) => width < sm,
        medium: (width) => width >= sm && width < md,
        large: (width) => width >= lg && width < xl,
        'extra-large': (width) => width >= xl
    };
    return breakPointBoundaries[size](currentSize || window.innerWidth);
};
export const useScreenSize = () => {
    const [size, setSize] = useState(window.innerWidth);
    const updateSize = () => setSize(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);
    return size;
};
export const useBreakpoint = (sizes) => useMediaQuery(screens(...[].concat(sizes)));
const breakpoints = {
    values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1920
    }
};
export const breakpointsList = {
    small: breakpoints.values.sm,
    medium: breakpoints.values.md,
    large: breakpoints.values.lg,
    'extra-large': breakpoints.values.xl
};
export default breakpoints;
//# sourceMappingURL=breakpoints.js.map