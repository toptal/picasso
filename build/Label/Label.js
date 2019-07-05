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
const styles_1 = require("@material-ui/core/styles");
const Icon_1 = require("../Icon");
const Chip_1 = __importDefault(require("../Chip"));
const LabelGroup_1 = __importDefault(require("../LabelGroup"));
const styles_2 = __importDefault(require("./styles"));
exports.Label = (_a) => {
    var { classes, children, className, icon, style, onDelete } = _a, rest = __rest(_a, ["classes", "children", "className", "icon", "style", "onDelete"]);
    return (react_1.default.createElement(Chip_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { className: className, style: style, deleteIcon: react_1.default.createElement("span", { "aria-label": 'delete icon', role: 'button', className: classes.deleteIcon },
            react_1.default.createElement(Icon_1.CloseMinor16, null)), onDelete: onDelete, label: children, icon: icon })));
};
exports.Label.defaultProps = {
    children: ''
};
exports.Label.displayName = 'Label';
exports.Label.Group = LabelGroup_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Label);
//# sourceMappingURL=Label.js.map