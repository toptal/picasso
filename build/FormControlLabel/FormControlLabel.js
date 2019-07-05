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
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const FormControlLabel = (_a) => {
    var { control, label, classes, className, style } = _a, rest = __rest(_a, ["control", "label", "classes", "className", "style"]);
    return (react_1.default.createElement(FormControlLabel_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { control: control, label: label, classes: classes, className: className, style: style })));
};
exports.default = styles_1.withStyles(styles_2.default)(FormControlLabel);
//# sourceMappingURL=FormControlLabel.js.map