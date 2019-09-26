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
import cx from 'classnames';
import Chip from '../Chip';
import { CloseMinor16 } from '../Icon';
import LabelGroup from '../LabelGroup';
import styles from './styles';
// eslint-disable-next-line react/display-name
export const Label = forwardRef(function Label(_a, ref) {
    var { children, classes, style, className, icon, disabled, onDelete, variant } = _a, rest = __rest(_a, ["children", "classes", "style", "className", "icon", "disabled", "onDelete", "variant"]);
    const handleDelete = () => {
        if (disabled) {
            return;
        }
        if (onDelete) {
            onDelete();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color } = rest, htmlAttributes = __rest(rest, ["color"]);
    return (React.createElement(Chip
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, htmlAttributes, { ref: ref, classes: {
            root: cx(classes.root, classes[variant], {
                [classes.disabled]: disabled
            })
        }, className: className, style: style, icon: icon, label: React.createElement("span", { className: classes.innerLabel }, children), deleteIcon: React.createElement("span", { "aria-label": 'delete icon', role: 'button' },
            React.createElement(CloseMinor16, null)), onDelete: onDelete ? handleDelete : undefined })));
});
Label.defaultProps = {
    children: '',
    variant: 'grey'
};
Label.displayName = 'Label';
Label.Group = LabelGroup;
export default withStyles(styles)(Label);
//# sourceMappingURL=Label.js.map