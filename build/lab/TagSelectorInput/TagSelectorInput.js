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
import InputAdornment from '../../InputAdornment';
import OutlinedInput from '../../OutlinedInput';
import styles from './styles';
export const TagSelectorInput = forwardRef(function TagSelectorInput(_a, ref) {
    var { id, name, defaultValue, value, placeholder, error, disabled, autoFocus, autoComplete, icon, iconPosition, classes, children, multiline, width, style, rows, rowsMax, type, onChange, startAdornment, endAdornment } = _a, rest = __rest(_a, ["id", "name", "defaultValue", "value", "placeholder", "error", "disabled", "autoFocus", "autoComplete", "icon", "iconPosition", "classes", "children", "multiline", "width", "style", "rows", "rowsMax", "type", "onChange", "startAdornment", "endAdornment"]);
    const IconAdornment = icon && (React.createElement(InputAdornment, { position: iconPosition, disabled: disabled, className: classes.loaderAdornment }, icon));
    const usedStartAdornment = icon && iconPosition === 'start' ? IconAdornment : startAdornment;
    const usedEndAdornment = icon && iconPosition === 'end' ? IconAdornment : endAdornment;
    return (React.createElement(OutlinedInput, { ref: ref, style: style, className: classes.inputBase, id: id, name: name, defaultValue: defaultValue, value: value, placeholder: placeholder, error: error, disabled: disabled, autoFocus: autoFocus, autoComplete: autoComplete, multiline: multiline, rows: rows, rowsMax: rowsMax, type: type, width: width, 
        // html attributes
        inputProps: rest, endAdornment: usedEndAdornment, startAdornment: usedStartAdornment, onChange: onChange }, children));
});
TagSelectorInput.defaultProps = {
    iconPosition: 'start',
    multiline: false,
    width: 'auto'
};
TagSelectorInput.displayName = 'TagSelectorInput';
export default withStyles(styles)(TagSelectorInput);
//# sourceMappingURL=TagSelectorInput.js.map