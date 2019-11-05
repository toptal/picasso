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
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '../InputAdornment';
import OutlinedInput from '../OutlinedInput';
import styles from './styles';
const useStyles = makeStyles(styles);
const hasCounter = (counter, limit) => limit || counter === 'entered';
const getCounter = (counter, charsLength, limit) => {
    if (counter === 'remaining') {
        return {
            isNegative: charsLength >= limit,
            limitValue: limit - charsLength
        };
    }
    return {
        isNegative: false,
        limitValue: charsLength
    };
};
const LimitAdornment = (props) => {
    const classes = useStyles(props);
    const { multiline, charsLength, counter, limit } = props;
    const { limitValue, isNegative } = getCounter(counter, charsLength, limit);
    return (React.createElement(InputAdornment, { position: 'end', className: multiline ? classes.counterMultiline : '' },
        React.createElement("span", { className: cx(classes.counter, {
                [classes.counterNegative]: isNegative
            }) }, limitValue)));
};
const IconAdornment = (props) => {
    const { position, disabled, icon } = props;
    const classes = useStyles(props);
    const styledIcon = React.cloneElement(icon, {
        className: classes.icon
    });
    return (React.createElement(InputAdornment, { position: position, disabled: disabled }, styledIcon));
};
const StartAdornment = ({ icon, iconPosition, disabled }) => {
    if (!icon || iconPosition !== 'start')
        return null;
    return React.createElement(IconAdornment, { disabled: disabled, position: 'start', icon: icon });
};
const EndAdornment = (props) => {
    const { icon, iconPosition, disabled, limit, multiline, charsLength, counter } = props;
    if (icon && iconPosition === 'end') {
        return React.createElement(IconAdornment, { disabled: disabled, position: 'end', icon: icon });
    }
    if (hasCounter(counter, limit)) {
        return (React.createElement(LimitAdornment, { charsLength: charsLength, multiline: multiline, counter: counter, limit: limit }));
    }
    return null;
};
export const Input = forwardRef(function Input(props, ref) {
    const { id, name, defaultValue, value, placeholder, error, disabled, icon, iconPosition, children, multiline, width, className, style, rows, rowsMax, type, onChange, startAdornment, endAdornment, limit, counter } = props, rest = __rest(props, ["id", "name", "defaultValue", "value", "placeholder", "error", "disabled", "icon", "iconPosition", "children", "multiline", "width", "className", "style", "rows", "rowsMax", "type", "onChange", "startAdornment", "endAdornment", "limit", "counter"]);
    const [charsLength, setCharsLength] = useState(value ? value.length : 0);
    const handleChange = e => {
        if (hasCounter(counter, limit)) {
            setCharsLength(e.target.value.length);
        }
        if (onChange) {
            onChange(e);
        }
    };
    const classes = useStyles(props);
    return (React.createElement(OutlinedInput, { ref: ref, className: className, style: style, classes: {
            root: cx(classes.root, {
                [classes.rootMultiline]: multiline
            }),
            input: classes.input
        }, id: id, name: name, defaultValue: defaultValue, value: value, placeholder: placeholder, error: error, disabled: disabled, multiline: multiline, rows: rows, rowsMax: rowsMax, type: type, width: width, 
        // html attributes
        inputProps: rest, startAdornment: startAdornment || (React.createElement(StartAdornment, { icon: icon, iconPosition: iconPosition, disabled: disabled })), endAdornment: endAdornment || (React.createElement(EndAdornment, { icon: icon, iconPosition: iconPosition, disabled: disabled, limit: limit, charsLength: charsLength, multiline: multiline, counter: counter })), onChange: handleChange }, children));
});
Input.defaultProps = {
    autoComplete: 'none',
    counter: 'remaining',
    iconPosition: 'start',
    multiline: false,
    width: 'auto'
};
Input.displayName = 'Input';
export default Input;
//# sourceMappingURL=Input.js.map