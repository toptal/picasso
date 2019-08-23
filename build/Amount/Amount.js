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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const styles_2 = __importDefault(require("./styles"));
/** Currency List: https://www.currency-iso.org/en/home/tables/table-a1.html */
exports.Amount = react_1.memo(
// eslint-disable-next-line react/display-name
react_1.forwardRef(function Amount(_a, ref) {
    var { amount, className, classes, currency } = _a, rest = __rest(_a, ["amount", "className", "classes", "currency"]);
    const formattedAmount = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    react_1.default.createElement("span", Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes.root, className) }), formattedAmount));
}));
exports.Amount.defaultProps = {
    currency: 'USD'
};
exports.Amount.displayName = 'Amount';
exports.default = styles_1.withStyles(styles_2.default)(exports.Amount);
//# sourceMappingURL=Amount.js.map