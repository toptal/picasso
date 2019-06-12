"use strict";
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
exports.Checkbox = ({ label, id, classes, className, style, disabled, required, onChange, value, checked, indeterminate }) => {
    const rootClasses = {
        root: classes.root,
        disabled: classes.disabled
    };
    const muiCheckbox = (react_1.default.createElement(Checkbox_1.default, { checked: checked, icon: react_1.default.createElement("div", { className: classes.uncheckedIcon }), checkedIcon: react_1.default.createElement("div", { className: classes.checkedIcon }), indeterminateIcon: react_1.default.createElement("div", { className: classes.indeterminateIcon }), classes: rootClasses, className: className, style: style, disabled: disabled, id: id, indeterminate: indeterminate, onChange: onChange, value: value }));
    if (!label) {
        return muiCheckbox;
    }
    return (react_1.default.createElement(FormControlLabel_1.default, { classes: rootClasses, control: muiCheckbox, label: react_1.default.createElement(Form_1.default.Label, { required: required, as: 'span' }, label) }));
};
exports.Checkbox.defaultProps = {
    disabled: false,
    indeterminate: false,
    onChange: () => { }
};
exports.Checkbox.displayName = 'Checkbox';
exports.default = styles_1.withStyles(styles_2.default)(exports.Checkbox);
//# sourceMappingURL=Checkbox.js.map