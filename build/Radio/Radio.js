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
import MUIRadio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '../FormControlLabel';
import Form from '../Form';
import styles from './styles';
// eslint-disable-next-line react/display-name
export const Radio = forwardRef(function Radio(_a, ref) {
    var { classes, className, style, label, checked, disabled, value, onChange } = _a, rest = __rest(_a, ["classes", "className", "style", "label", "checked", "disabled", "value", "onChange"]);
    const rootClasses = {
        root: classes.root,
        disabled: classes.disabled
    };
    const muiRadio = (React.createElement(MUIRadio
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, checked: checked, disabled: disabled, onChange: onChange, value: value, icon: React.createElement("div", { className: classes.uncheckedIcon }), checkedIcon: React.createElement("div", { className: classes.checkedIcon }), color: 'default', classes: rootClasses, className: className, style: style })));
    if (!label) {
        return muiRadio;
    }
    return (React.createElement(FormControlLabel, { control: muiRadio, className: classes.label, classes: rootClasses, style: style, label: React.createElement(Form.Label, { disabled: disabled, as: 'span' }, label) }));
});
Radio.defaultProps = {
    classes: {},
    disabled: false
};
Radio.displayName = 'Radio';
Radio.Group = RadioGroup;
export default withStyles(styles)(Radio);
//# sourceMappingURL=Radio.js.map