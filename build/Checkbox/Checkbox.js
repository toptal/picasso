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
import MUICheckbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '../FormControlLabel';
import Form from '../Form';
import styles from './styles';
export const Checkbox = forwardRef(function Checkbox(_a, ref) {
    var { label, id, classes, className, style, disabled, required, onChange, value, checked, indeterminate } = _a, rest = __rest(_a, ["label", "id", "classes", "className", "style", "disabled", "required", "onChange", "value", "checked", "indeterminate"]);
    const rootClasses = {
        root: classes.root,
        disabled: classes.disabled
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color } = rest, checkboxAttributes = __rest(rest, ["color"]);
    const muiCheckbox = (React.createElement(MUICheckbox
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, checkboxAttributes, { ref: ref, checked: checked, icon: React.createElement("div", { className: classes.uncheckedIcon }), checkedIcon: React.createElement("div", { className: classes.checkedIcon }), indeterminateIcon: React.createElement("div", { className: classes.indeterminateIcon }), classes: rootClasses, className: className, style: style, disabled: disabled, id: id, indeterminate: indeterminate, onChange: onChange, value: value })));
    if (!label) {
        return muiCheckbox;
    }
    return (React.createElement(FormControlLabel, { classes: rootClasses, control: muiCheckbox, label: React.createElement(Form.Label, { required: required, disabled: disabled, as: 'span' }, label) }));
});
Checkbox.defaultProps = {
    disabled: false,
    indeterminate: false,
    onChange: () => { }
};
Checkbox.displayName = 'Checkbox';
export default withStyles(styles)(Checkbox);
//# sourceMappingURL=Checkbox.js.map