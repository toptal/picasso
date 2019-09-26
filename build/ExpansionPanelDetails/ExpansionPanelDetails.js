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
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import styles from './styles';
const ExpansionPanelDetails = (_a) => {
    var { classes, children } = _a, rest = __rest(_a, ["classes", "children"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(MUIExpansionPanelDetails, Object.assign({}, rest, { classes: classes }), children));
};
export default withStyles(styles)(ExpansionPanelDetails);
//# sourceMappingURL=ExpansionPanelDetails.js.map