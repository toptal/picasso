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
const utils_1 = require("../utils");
const UserBadge_1 = __importDefault(require("../UserBadge"));
const Avatar_1 = __importDefault(require("../Avatar"));
const Dropdown_1 = __importDefault(require("../Dropdown"));
const Typography_1 = __importDefault(require("../Typography"));
const styles_2 = __importDefault(require("./styles"));
exports.PageHeaderMenu = react_1.forwardRef(function PageHeaderMenu(_a, ref) {
    var { name, meta, avatar, classes, className, style, children } = _a, rest = __rest(_a, ["name", "meta", "avatar", "classes", "className", "style", "children"]);
    const isSmallScreen = utils_1.useBreakpoint('small');
    const metaContent = typeof meta === 'string' ? (react_1.default.createElement(Typography_1.default, { className: classes.truncateText, invert: true, size: 'small' }, meta)) : (meta);
    const content = isSmallScreen ? (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(UserBadge_1.default, { center: true, size: 'xsmall', classes: {
                root: classes.contentUserBadge,
                avatar: classes.avatar,
                name: classnames_1.default(classes.name, classes.truncateText)
            }, name: name, avatar: avatar }, meta && metaContent),
        children)) : (children);
    const trigger = isSmallScreen ? (react_1.default.createElement(Avatar_1.default, { size: 'xsmall', classes: {
            root: classes.avatar,
            xsmall: classes.xsmall
        }, src: avatar })) : (react_1.default.createElement(UserBadge_1.default, { invert: true, center: true, size: 'xsmall', classes: {
            avatar: classes.avatar,
            name: classnames_1.default(classes.name, classes.truncateText)
        }, name: name, avatar: avatar }, meta && metaContent));
    return (react_1.default.createElement(Dropdown_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes.root, className), classes: { content: classes.content }, style: style, content: content, offset: { top: isSmallScreen ? 'small' : 'xsmall' } }),
        trigger,
        react_1.default.createElement(Dropdown_1.default.Arrow, { className: classes.arrow })));
});
exports.PageHeaderMenu.defaultProps = {};
exports.PageHeaderMenu.displayName = 'PageHeaderMenu';
exports.default = styles_1.withStyles(styles_2.default)(exports.PageHeaderMenu);
//# sourceMappingURL=PageHeaderMenu.js.map