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
const Container_1 = __importDefault(require("../Container"));
const styles_2 = __importDefault(require("./styles"));
const Helpbox_1 = require("../Helpbox");
exports.HelpboxActions = react_1.forwardRef(function HelpboxActions(_a, ref) {
    var { classes, className, style, children } = _a, rest = __rest(_a, ["classes", "className", "style", "children"]);
    const { closeable } = Helpbox_1.HelpboxContext
        ? react_1.useContext(Helpbox_1.HelpboxContext)
        : {};
    return (react_1.default.createElement(Container_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes.root, {
            [classes.rootCloseable]: closeable
        }, className), style: style, flex: true, alignItems: 'center' }), children));
});
exports.HelpboxActions.defaultProps = {};
exports.HelpboxActions.displayName = 'HelpboxActions';
exports.default = styles_1.withStyles(styles_2.default)(exports.HelpboxActions);
//# sourceMappingURL=HelpboxActions.js.map