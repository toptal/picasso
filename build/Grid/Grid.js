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
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const GridItem_1 = __importDefault(require("../GridItem"));
const styles_2 = __importDefault(require("./styles"));
exports.Grid = (_a) => {
    var { children, spacing, direction, alignItems, justify, wrap, classes, className, style } = _a, rest = __rest(_a, ["children", "spacing", "direction", "alignItems", "justify", "wrap", "classes", "className", "style"]);
    return (react_1.default.createElement(Grid_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { container: true, spacing: spacing, direction: direction, alignItems: alignItems, justify: justify, wrap: wrap, classes: classes, className: className, style: style }), children));
};
exports.Grid.defaultProps = {
    alignItems: 'flex-start',
    direction: 'row',
    justify: 'flex-start',
    spacing: 32,
    wrap: 'wrap'
};
exports.Grid.Item = GridItem_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Grid);
//# sourceMappingURL=Grid.js.map