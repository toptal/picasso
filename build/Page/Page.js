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
const PageHeader_1 = __importDefault(require("../PageHeader"));
const PageHeaderMenu_1 = __importDefault(require("../PageHeaderMenu"));
const PageFooter_1 = __importDefault(require("../PageFooter"));
const PageContent_1 = __importDefault(require("../PageContent"));
const Sidebar_1 = __importDefault(require("../lab/Sidebar"));
const styles_2 = __importDefault(require("./styles"));
exports.PageContext = react_1.default.createContext({});
// eslint-disable-next-line react/display-name
exports.Page = react_1.forwardRef(function Page(_a, ref) {
    var { children, classes, className, style, fullWidth } = _a, rest = __rest(_a, ["children", "classes", "className", "style", "fullWidth"]);
    return (react_1.default.createElement("div", Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes.root, className), style: style }),
        react_1.default.createElement(exports.PageContext.Provider, { value: { fullWidth } }, children)));
});
exports.Page.defaultProps = {
    fullWidth: false
};
exports.Page.displayName = 'Page';
exports.Page.Header = PageHeader_1.default;
exports.Page.HeaderMenu = PageHeaderMenu_1.default;
exports.Page.Content = PageContent_1.default;
exports.Page.Footer = PageFooter_1.default;
exports.Page.Sidebar = Sidebar_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Page);
//# sourceMappingURL=Page.js.map