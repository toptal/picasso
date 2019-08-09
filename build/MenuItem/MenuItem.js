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
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Typography_1 = __importDefault(require("../Typography"));
const styles_2 = __importDefault(require("./styles"));
exports.MenuItem = (_a) => {
    var { as, children, classes, className, disabled, disableGutters, onClick, selected, style, value } = _a, rest = __rest(_a, ["as", "children", "classes", "className", "disabled", "disableGutters", "onClick", "selected", "style", "value"]);
    if (typeof children === 'string') {
        children = (react_1.default.createElement(Typography_1.default, { className: classes.stringContent, style: style, color: 'inherit' }, children));
    }
    return (react_1.default.createElement(MenuItem_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { 
        // TODO: -1 is added to keep backward compatibility e.g. for AccountSelect component
        // Should be fixed during https://toptal-core.atlassian.net/browse/FX-310
        tabIndex: -1, component: as, className: className, disabled: disabled, disableGutters: disableGutters, onClick: onClick, style: style, value: value, selected: selected }), children));
};
exports.MenuItem.defaultProps = {
    as: 'li',
    onClick: () => { }
};
exports.MenuItem.displayName = 'MenuItem';
exports.default = styles_1.withStyles(styles_2.default)(exports.MenuItem);
//# sourceMappingURL=MenuItem.js.map