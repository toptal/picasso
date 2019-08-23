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
const TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
const styles_2 = __importDefault(require("./styles"));
exports.TableRow = react_1.forwardRef(function TableRow(_a, ref) {
    var { classes, className, style, children, hover, selected, onClick } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "hover", "selected", "onClick"]);
    return (react_1.default.createElement(TableRow_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: classes, className: className, style: style, hover: hover, selected: selected, onClick: onClick }), children));
});
exports.TableRow.defaultProps = {
    hover: false,
    selected: false
};
exports.TableRow.displayName = 'TableRow';
exports.default = styles_1.withStyles(styles_2.default)(exports.TableRow);
//# sourceMappingURL=TableRow.js.map