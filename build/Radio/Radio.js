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
const Radio_1 = __importDefault(require("@material-ui/core/Radio"));
const RadioGroup_1 = __importDefault(require("@material-ui/core/RadioGroup"));
const styles_1 = require("@material-ui/core/styles");
const FormControlLabel_1 = __importDefault(require("../FormControlLabel"));
const Form_1 = __importDefault(require("../Form"));
const styles_2 = __importDefault(require("./styles"));
exports.Radio = (_a) => {
    var { classes, className, style, label, checked, disabled, value, onChange } = _a, rest = __rest(_a, ["classes", "className", "style", "label", "checked", "disabled", "value", "onChange"]);
    const rootClasses = {
        root: classes.root,
        disabled: classes.disabled
    };
    const muiRadio = (react_1.default.createElement(Radio_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { checked: checked, disabled: disabled, onChange: onChange, value: value, icon: react_1.default.createElement("div", { className: classes.uncheckedIcon }), checkedIcon: react_1.default.createElement("div", { className: classes.checkedIcon }), color: 'default', classes: rootClasses, className: className, style: style })));
    if (!label) {
        return muiRadio;
    }
    return (react_1.default.createElement(FormControlLabel_1.default, { control: muiRadio, className: classes.label, classes: rootClasses, style: style, label: react_1.default.createElement(Form_1.default.Label, { as: 'span' }, label) }));
};
exports.Radio.defaultProps = {
    classes: {},
    disabled: false
};
exports.Radio.displayName = 'Radio';
exports.Radio.Group = RadioGroup_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Radio);
//# sourceMappingURL=Radio.js.map