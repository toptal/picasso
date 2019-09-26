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
import FormField from '../FormField';
import FormHint from '../FormHint';
import FormLabel from '../FormLabel';
import FormError from '../FormError';
// eslint-disable-next-line react/display-name
export const Form = forwardRef(function Form(_a, ref) {
    var { onSubmit, className, style, children } = _a, rest = __rest(_a, ["onSubmit", "className", "style", "children"]);
    return (React.createElement("form", Object.assign({}, rest, { ref: ref, onSubmit: onSubmit, className: className, style: style }), children));
});
Form.Field = FormField;
Form.Hint = FormHint;
Form.Label = FormLabel;
Form.Error = FormError;
Form.displayName = 'Form';
export default Form;
//# sourceMappingURL=Form.js.map