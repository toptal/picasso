"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Avatar_1 = __importDefault(require("../Avatar"));
const Typography_1 = __importDefault(require("../Typography"));
const Container_1 = __importDefault(require("../Container"));
const styles_2 = __importDefault(require("./styles"));
exports.UserBadge = ({ avatar, name, size, title, invert, center, children, classes, className, style }) => {
    const UserBadgeAvatar = react_1.default.isValidElement(avatar) ? (avatar) : (react_1.default.createElement(Avatar_1.default, { className: classes.avatar, name: name, size: size, src: avatar }));
    // if 'auto' then center if children are null
    const shouldCenter = center === true || (center === 'auto' && !children);
    const alignItems = shouldCenter ? 'center' : 'flex-start';
    const userTitle = title && (react_1.default.createElement(Typography_1.default, { inline: true, invert: invert, className: classes.title, size: 'medium' }, title));
    return (react_1.default.createElement(Container_1.default, { flex: true, alignItems: alignItems, className: classnames_1.default(classes.root, className), style: style },
        UserBadgeAvatar,
        react_1.default.createElement(Container_1.default, { flex: true, direction: 'column', left: 'small' },
            react_1.default.createElement(Container_1.default, null,
                react_1.default.createElement(Typography_1.default, { className: classes.name, inline: true, variant: 'heading', size: 'small', invert: invert }, name),
                userTitle),
            children)));
};
exports.UserBadge.defaultProps = {
    center: 'auto',
    invert: false,
    size: 'xsmall'
};
exports.UserBadge.displayName = 'UserBadge';
exports.default = styles_1.withStyles(styles_2.default)(exports.UserBadge);
//# sourceMappingURL=UserBadge.js.map