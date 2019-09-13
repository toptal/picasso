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
const __1 = require("../");
const Page_1 = require("../Page");
const Picasso_1 = require("../Picasso");
const utils_1 = require("../utils");
const styles_2 = __importDefault(require("./styles"));
exports.PageHeader = react_1.forwardRef(function PageHeader(_a, ref) {
    var { classes, className, style, title, logoLink, rightContent, actionItems, variant } = _a, rest = __rest(_a, ["classes", "className", "style", "title", "logoLink", "rightContent", "actionItems", "variant"]);
    const isSmallScreen = utils_1.useBreakpoint('small');
    const { setHasPageHeader } = Picasso_1.usePageHeader();
    react_1.useLayoutEffect(() => {
        setHasPageHeader(true);
        return function cleanup() {
            setHasPageHeader(false);
        };
    }, []);
    const { fullWidth } = react_1.useContext(Page_1.PageContext);
    const logo = (react_1.default.createElement(__1.Logo, { variant: 'white', emblem: isSmallScreen, className: classes.logo }));
    const titleComponent = title && (react_1.default.createElement(__1.Container, { left: 'small', flex: true, alignItems: 'center' },
        react_1.default.createElement("div", { className: classes.divider }),
        react_1.default.createElement(__1.Container, { left: 'small' },
            react_1.default.createElement(__1.Typography, { invert: true, weight: 'light' }, title))));
    return (react_1.default.createElement("header", Object.assign({}, rest, { ref: ref, className: classnames_1.default('mui-fixed', classes.root, classes[variant], className), style: style }),
        react_1.default.createElement("div", { className: classnames_1.default({ [classes.fullWidth]: fullWidth }, classes.content) },
            react_1.default.createElement("div", { className: classes.left },
                react_1.default.createElement(__1.Container, { className: classes.logoContainer, flex: true, alignItems: 'center' }, logoLink ? react_1.default.cloneElement(logoLink, {}, logo) : logo),
                !isSmallScreen && titleComponent),
            react_1.default.createElement("div", { className: classes.right },
                !isSmallScreen && actionItems,
                rightContent))));
});
exports.PageHeader.defaultProps = {
    variant: 'light'
};
exports.PageHeader.displayName = 'PageHeader';
exports.default = styles_1.withStyles(styles_2.default)(exports.PageHeader);
//# sourceMappingURL=PageHeader.js.map