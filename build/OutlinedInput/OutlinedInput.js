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
import MUIOutlinedInput from '@material-ui/core/OutlinedInput';
import { capitalize } from '@material-ui/core/utils/helpers';
import styles from './styles';
const OutlinedInput = forwardRef(function OutlinedInput(_a, ref) {
    var { classes, className, style, multiline, rows, rowsMax, width, inputComponent, inputProps, defaultValue, value, type, error, startAdornment, endAdornment, onChange } = _a, rest = __rest(_a, ["classes", "className", "style", "multiline", "rows", "rowsMax", "width", "inputComponent", "inputProps", "defaultValue", "value", "type", "error", "startAdornment", "endAdornment", "onChange"]);
    return (React.createElement(MUIOutlinedInput
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { classes: {
            root: cx(classes.root, classes[`root${capitalize(width)}`]),
            input: classes.input,
            inputMultiline: classes.inputMultiline
        }, className: className, style: style, labelWidth: 0, fullWidth: width === 'full', error: error, inputComponent: inputComponent, inputProps: inputProps, inputRef: ref, defaultValue: defaultValue, value: value, type: type, startAdornment: startAdornment, endAdornment: endAdornment, multiline: multiline, rows: rows, rowsMax: rowsMax, onChange: onChange })));
});
OutlinedInput.defaultProps = {
    width: 'auto'
};
OutlinedInput.displayName = 'OutlinedInput';
export default withStyles(styles)(OutlinedInput);
//# sourceMappingURL=OutlinedInput.js.map