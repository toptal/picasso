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
const TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
const styles_2 = __importDefault(require("./styles"));
exports.TableBody = (_a) => {
    var { classes, className, style, children } = _a, rest = __rest(_a, ["classes", "className", "style", "children"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    react_1.default.createElement(TableBody_1.default, Object.assign({}, rest, { classes: classes, className: className, style: style }), children));
};
exports.TableBody.defaultProps = {};
exports.TableBody.displayName = 'TableBody';
exports.default = styles_1.withStyles(styles_2.default)(exports.TableBody);
//# sourceMappingURL=TableBody.js.map