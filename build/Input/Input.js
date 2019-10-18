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
import InputAdornment from '../InputAdornment';
import OutlinedInput from '../OutlinedInput';
import styles from './styles';
export const Input = forwardRef(function Input(_a, ref) {
    var { id, name, defaultValue, value, placeholder, error, disabled, icon, iconPosition, classes, children, multiline, width, className, style, rows, rowsMax, type, onChange, startAdornment, endAdornment, limit } = _a, rest = __rest(_a, ["id", "name", "defaultValue", "value", "placeholder", "error", "disabled", "icon", "iconPosition", "classes", "children", "multiline", "width", "className", "style", "rows", "rowsMax", "type", "onChange", "startAdornment", "endAdornment", "limit"]);
    let usedStartAdornment = startAdornment;
    let usedEndAdornment = endAdornment;
    const [charsLength, setCharsLength] = useState(value ? value.length : 0);
    if (icon) {
        const styledIcon = React.cloneElement(icon, {
            className: classes.icon
        });
        const iconAdornment = (React.createElement(InputAdornment, { position: iconPosition, disabled: disabled }, styledIcon));
        if (iconPosition === 'start') {
            usedStartAdornment = iconAdornment;
        }
        else if (iconPosition === 'end') {
            usedEndAdornment = iconAdornment;
        }
    }
    else if (limit) {
        usedEndAdornment = (React.createElement(InputAdornment, { position: 'end', classes: {
                root: multiline ? classes.counterMultiline : ''
            } },
            React.createElement("span", { className: cx(classes.counter, {
                    [classes.counterNegative]: charsLength >= limit
                }) }, limit - charsLength)));
    }
    const handleChange = e => {
        setCharsLength(e.target.value.length);
        if (onChange) {
            onChange(e);
        }
    };
    return (React.createElement(OutlinedInput, { ref: ref, className: className, style: style, classes: {
            root: cx(classes.root, {
                [classes.rootMultiline]: multiline
            }),
            input: classes.input
        }, id: id, name: name, defaultValue: defaultValue, value: value, placeholder: placeholder, error: error, disabled: disabled, multiline: multiline, rows: rows, rowsMax: rowsMax, type: type, width: width, 
        // html attributes
        inputProps: rest, endAdornment: usedEndAdornment, startAdornment: usedStartAdornment, onChange: limit ? handleChange : onChange }, children));
});
Input.defaultProps = {
    autoComplete: 'none',
    iconPosition: 'start',
    multiline: false,
    width: 'auto'
};
Input.displayName = 'Input';
export default withStyles(styles)(Input);
//# sourceMappingURL=Input.js.map