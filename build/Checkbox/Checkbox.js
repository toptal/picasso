"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
const styles_1 = require("@material-ui/core/styles");
const FormControlLabel_1 = __importDefault(require("../FormControlLabel"));
const Form_1 = __importDefault(require("../Form"));
const styles_2 = __importDefault(require("./styles"));
exports.Checkbox = (_a) => {
    var { label, id, classes, className, style, disabled, required, onChange, value, checked, indeterminate } = _a, rest = __rest(_a, ["label", "id", "classes", "className", "style", "disabled", "required", "onChange", "value", "checked", "indeterminate"]);
    const rootClasses = {
        root: classes.root,
        disabled: classes.disabled
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color } = rest, checkboxAttributes = __rest(rest, ["color"]);
    const muiCheckbox = (react_1.default.createElement(Checkbox_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, checkboxAttributes, { checked: checked, icon: react_1.default.createElement("div", { className: classes.uncheckedIcon }), checkedIcon: react_1.default.createElement("div", { className: classes.checkedIcon }), indeterminateIcon: react_1.default.createElement("div", { className: classes.indeterminateIcon }), classes: rootClasses, className: className, style: style, disabled: disabled, id: id, indeterminate: indeterminate, onChange: onChange, value: value })));
    if (!label) {
        return muiCheckbox;
    }
    return (react_1.default.createElement(FormControlLabel_1.default, { classes: rootClasses, control: muiCheckbox, label: react_1.default.createElement(Form_1.default.Label, { required: required, disabled: disabled, as: 'span' }, label) }));
};
exports.Checkbox.defaultProps = {
    disabled: false,
    indeterminate: false,
    onChange: () => { }
};
exports.Checkbox.displayName = 'Checkbox';
exports.default = styles_1.withStyles(styles_2.default)(exports.Checkbox);
//# sourceMappingURL=Checkbox.js.map