var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIGrid from '@material-ui/core/Grid';
import GridItem from '../GridItem';
import styles from './styles';
const humanToMUISpacing = (spacing) => {
    /** Material Design margins and columns follow an 8px square baseline grid */
    return (spacing / 8);
};
// eslint-disable-next-line react/display-name
export const Grid = forwardRef(function Grid(_a, ref) {
    var { children, spacing, direction, alignItems, justifyContent, wrap, classes, className, style } = _a, rest = __rest(_a, ["children", "spacing", "direction", "alignItems", "justifyContent", "wrap", "classes", "className", "style"]);
    return (React.createElement(MUIGrid
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, container: true, spacing: humanToMUISpacing(spacing), direction: direction, alignItems: alignItems, justify: justifyContent, wrap: wrap, classes: classes, className: className, style: style }), children));
});
Grid.defaultProps = {
    alignItems: 'flex-start',
    direction: 'row',
    justifyContent: 'flex-start',
    spacing: 32,
    wrap: 'wrap'
};
Grid.Item = GridItem;
export default withStyles(styles)(Grid);
//# sourceMappingURL=Grid.js.map