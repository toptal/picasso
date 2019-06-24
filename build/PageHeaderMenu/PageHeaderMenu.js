"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const react_deprecate_1 = __importDefault(require("react-deprecate"));
const UserBadge_1 = __importDefault(require("../UserBadge"));
const Dropdown_1 = __importDefault(require("../Dropdown"));
const Typography_1 = __importDefault(require("../Typography"));
const styles_2 = __importDefault(require("./styles"));
exports.PageHeaderMenu = ({ name, meta, avatar, classes, className, style, children }) => {
    const metaContent = typeof meta === 'string' ? (react_1.default.createElement(Typography_1.default, { className: classes.truncateText, invert: true, size: 'small' }, meta)) : (meta);
    return (react_1.default.createElement(Dropdown_1.default, { className: classnames_1.default(classes.root, className), classes: { content: classes.content }, style: style, content: children, offset: { top: 'xsmall' } },
        react_1.default.createElement(UserBadge_1.default, { invert: true, center: true, size: 'xsmall', classes: {
                avatar: classes.avatar,
                name: classnames_1.default(classes.name, classes.truncateText)
            }, name: name, avatar: avatar }, meta && metaContent),
        react_1.default.createElement(Dropdown_1.default.Arrow, { style: { color: 'white' } })));
};
exports.PageHeaderMenu.defaultProps = {};
exports.PageHeaderMenu.displayName = 'PageHeaderMenu';
exports.default = react_deprecate_1.default(styles_1.withStyles(styles_2.default)(exports.PageHeaderMenu), {
    organization: 'meta'
});
//# sourceMappingURL=PageHeaderMenu.js.map