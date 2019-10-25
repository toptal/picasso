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
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '../../OutlinedInput';
import styles from './styles';
const useStyles = makeStyles(styles);
export const TagSelectorInput = forwardRef(function TagSelectorInput(props, ref) {
    const { id, name, defaultValue, value, placeholder, error, disabled, autoFocus, autoComplete, children, multiline, width, style, rows, rowsMax, type, onChange, startAdornment, endAdornment } = props, rest = __rest(props, ["id", "name", "defaultValue", "value", "placeholder", "error", "disabled", "autoFocus", "autoComplete", "children", "multiline", "width", "style", "rows", "rowsMax", "type", "onChange", "startAdornment", "endAdornment"]);
    const classes = useStyles(props);
    let usedEndAdornment = null;
    if (endAdornment) {
        usedEndAdornment = React.cloneElement(endAdornment, {
            className: classes.loaderAdornment
        });
    }
    return (React.createElement(OutlinedInput, { ref: ref, style: style, className: classes.inputBase, id: id, name: name, defaultValue: defaultValue, value: value, placeholder: placeholder, error: error, disabled: disabled, autoFocus: autoFocus, autoComplete: autoComplete, multiline: multiline, rows: rows, rowsMax: rowsMax, type: type, width: width, 
        // html attributes
        inputProps: rest, endAdornment: usedEndAdornment, startAdornment: startAdornment, onChange: onChange }, children));
});
TagSelectorInput.defaultProps = {
    multiline: false,
    width: 'auto'
};
TagSelectorInput.displayName = 'TagSelectorInput';
export default TagSelectorInput;
//# sourceMappingURL=TagSelectorInput.js.map