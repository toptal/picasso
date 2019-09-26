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
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ArrowDownMinor16 } from '../Icon';
import ExpansionPanelSummary from '../ExpansionPanelSummary';
import ExpansionPanelDetails from '../ExpansionPanelDetails';
import styles from './styles';
export const Accordion = forwardRef(function Accordion(_a, ref) {
    var { children, content, expanded, expandIcon, bordered, disabled, className, style, classes, onChange } = _a, rest = __rest(_a, ["children", "content", "expanded", "expandIcon", "bordered", "disabled", "className", "style", "classes", "onChange"]);
    return (React.createElement(MUIExpansionPanel
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: children ? cx(classes.root, { [classes.bordered]: bordered }) : ''
        }, className: className, style: style, elevation: 0, expanded: expanded, disabled: disabled, onChange: onChange }),
        children ? (React.createElement(ExpansionPanelSummary, { classes: {
                root: classes.summary,
                content: classes.content
            }, expandIcon: expandIcon || React.createElement(ArrowDownMinor16, { className: classes.expandIcon }) }, children)) : (React.createElement(React.Fragment, null)),
        React.createElement(ExpansionPanelDetails, { classes: {
                root: classes.details
            } }, content)));
});
Accordion.defaultProps = {
    bordered: true,
    defaultExpanded: false,
    disabled: false,
    expanded: undefined,
    onChange: () => { }
};
Accordion.displayName = 'Accordion';
export default withStyles(styles)(Accordion);
//# sourceMappingURL=Accordion.js.map