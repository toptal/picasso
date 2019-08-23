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
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const styles_2 = __importDefault(require("./styles"));
const Chip = react_1.forwardRef(function Chip(_a, ref) {
    var { classes, className, style, deleteIcon, icon, label, onDelete } = _a, rest = __rest(_a, ["classes", "className", "style", "deleteIcon", "icon", "label", "onDelete"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color } = rest, htmlAttributes = __rest(rest, ["color"]);
    const { innerLabel } = classes, restClasses = __rest(classes, ["innerLabel"]);
    return (react_1.default.createElement(Chip_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, htmlAttributes, { ref: ref, classes: restClasses, className: className, style: style, icon: icon, label: react_1.default.createElement("span", { className: innerLabel }, label), deleteIcon: deleteIcon, onDelete: onDelete })));
});
Chip.displayName = 'Chip';
exports.default = styles_1.withStyles(styles_2.default)(Chip);
//# sourceMappingURL=Chip.js.map