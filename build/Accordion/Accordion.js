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
import React, { forwardRef, useState } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ArrowDownMinor16 } from '../Icon';
import ExpansionPanelSummary from '../ExpansionPanelSummary';
import ExpansionPanelDetails from '../ExpansionPanelDetails';
import styles from './styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmptyExpansionPanelSummary = ({ expanded }) => (React.createElement("div", null));
const decorateWithExpandIconClasses = (expandIcon, classes) => React.cloneElement(expandIcon, {
    className: cx(expandIcon.props.className, classes)
});
export const Accordion = forwardRef(function Accordion(_a, ref) {
    var { children, content, expanded, defaultExpanded, expandIcon, bordered, disabled, className, style, classes, onChange } = _a, rest = __rest(_a, ["children", "content", "expanded", "defaultExpanded", "expandIcon", "bordered", "disabled", "className", "style", "classes", "onChange"]);
    const [summaryExpanded, setSummaryExpanded] = useState(defaultExpanded);
    const [prevExpanded, setPrevExpanded] = useState(defaultExpanded);
    // getDerivedStateFromProps implementation to allow expanded to be controlled
    if (expanded !== undefined && expanded !== prevExpanded) {
        setSummaryExpanded(expanded);
        setPrevExpanded(expanded);
    }
    const handleSummaryClick = () => {
        setSummaryExpanded(!summaryExpanded);
    };
    const expandIconClass = cx(classes.expandIcon, {
        [classes.expandIconExpanded]: summaryExpanded
    });
    return (React.createElement(MUIExpansionPanel
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: children ? cx(classes.root, { [classes.bordered]: bordered }) : ''
        }, className: className, style: style, elevation: 0, expanded: summaryExpanded, disabled: disabled, onChange: onChange }),
        children ? (React.createElement(ExpansionPanelSummary, { classes: {
                root: classes.summary,
                content: classes.content
            }, expandIcon: null, onClick: handleSummaryClick },
            children,
            expandIcon ? (decorateWithExpandIconClasses(expandIcon, expandIconClass)) : (React.createElement("div", { className: classes.expandIconAlignTop },
                React.createElement(ArrowDownMinor16, { className: expandIconClass }))))) : (React.createElement(EmptyExpansionPanelSummary, null)),
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