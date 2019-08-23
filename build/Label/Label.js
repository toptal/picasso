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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = require("../Icon");
const Chip_1 = __importDefault(require("../Chip"));
const LabelGroup_1 = __importDefault(require("../LabelGroup"));
const styles_2 = __importDefault(require("./styles"));
// eslint-disable-next-line react/display-name
exports.Label = react_1.forwardRef(function Label(_a, ref) {
    var { children, classes, style, className, icon, disabled, onDelete, variant } = _a, rest = __rest(_a, ["children", "classes", "style", "className", "icon", "disabled", "onDelete", "variant"]);
    return (react_1.default.createElement(Chip_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: classnames_1.default(classes[variant], {
                [classes.disabled]: disabled
            })
        }, className: className, style: style, deleteIcon: react_1.default.createElement("span", { "aria-label": 'delete icon', role: 'button' },
            react_1.default.createElement(Icon_1.CloseMinor16, null)), onDelete: onDelete, label: children, icon: icon })));
});
exports.Label.defaultProps = {
    children: '',
    variant: 'grey'
};
exports.Label.displayName = 'Label';
exports.Label.Group = LabelGroup_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Label);
//# sourceMappingURL=Label.js.map