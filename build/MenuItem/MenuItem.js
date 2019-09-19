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
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const styles_2 = __importDefault(require("./styles"));
exports.MenuItem = react_1.forwardRef(function MenuItem(_a, ref) {
    var { as, children, classes, className, disabled, disableGutters, onClick, selected, style, value, variant } = _a, rest = __rest(_a, ["as", "children", "classes", "className", "disabled", "disableGutters", "onClick", "selected", "style", "value", "variant"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { stringContent, light, dark } = classes, restClasses = __rest(classes, ["stringContent", "light", "dark"]);
    if (typeof children === 'string') {
        children = (react_1.default.createElement("span", { className: stringContent, style: style }, children));
    }
    return (react_1.default.createElement(MenuItem_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, component: as, classes: restClasses, className: classnames_1.default(classes[variant], className), disabled: disabled, disableGutters: disableGutters, onClick: onClick, style: style, value: value, selected: selected }), children));
});
exports.MenuItem.defaultProps = {
    as: 'li',
    onClick: () => { },
    variant: 'light'
};
exports.MenuItem.displayName = 'MenuItem';
exports.default = styles_1.withStyles(styles_2.default)(exports.MenuItem);
//# sourceMappingURL=MenuItem.js.map