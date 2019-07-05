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
const SnackbarContent_1 = __importDefault(require("@material-ui/core/SnackbarContent"));
const classnames_1 = __importDefault(require("classnames"));
const helpers_1 = require("@material-ui/core/utils/helpers");
const palette_1 = __importDefault(require("../Picasso/config/palette"));
const Icon_1 = require("../Icon");
const Container_1 = __importDefault(require("../Container"));
const Button_1 = __importDefault(require("../Button"));
const styles_2 = __importDefault(require("./styles"));
const Typography_1 = __importDefault(require("../Typography"));
const renderNotificationCloseButton = ({ onClose, classes: { close, closeIcon } }) => (react_1.default.createElement(Button_1.default, { circular: true, onClick: onClose, className: close, title: 'Close Notification', icon: react_1.default.createElement(Icon_1.Close, { className: closeIcon }) }));
const renderNotificationIcon = ({ icon, variant, classes }) => {
    const iconProps = {
        className: classes.icon
    };
    // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
    // Missing the following: https://github.com/toptal/picasso/issues/253
    switch (variant) {
        case 'red':
            // eslint-disable-next-line react/jsx-props-no-spreading
            return react_1.default.createElement(Icon_1.Exclamation16, Object.assign({}, iconProps, { color: palette_1.default.red.main }));
        case 'yellow':
            // eslint-disable-next-line react/jsx-props-no-spreading
            return react_1.default.createElement(Icon_1.Exclamation16, Object.assign({}, iconProps, { color: palette_1.default.yellow.main }));
        case 'green':
            // eslint-disable-next-line react/jsx-props-no-spreading
            return react_1.default.createElement(Icon_1.CheckMinor16, Object.assign({}, iconProps, { color: palette_1.default.green.main }));
        default:
            const infoProps = Object.assign({}, iconProps, { color: palette_1.default.grey.main });
            // eslint-disable-next-line react/jsx-props-no-spreading
            return icon ? react_1.cloneElement(icon, infoProps) : react_1.default.createElement(Icon_1.Info16, Object.assign({}, infoProps));
    }
};
const renderNotificationContent = (props) => {
    const { classes: { iconWrapper, content, contentCloseButton }, children, onClose } = props;
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Container_1.default, { flex: true, alignItems: 'center', className: iconWrapper }, renderNotificationIcon(props)),
        react_1.default.createElement(Typography_1.default, { size: 'medium', className: classnames_1.default(content, {
                [contentCloseButton]: onClose
            }), as: 'div' }, children),
        onClose && renderNotificationCloseButton(props)));
};
exports.Notification = props => {
    const { className, classes, variant, elevated, fullWidth } = props, rest = __rest(props, ["className", "classes", "variant", "elevated", "fullWidth"]);
    return (react_1.default.createElement(SnackbarContent_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { className: classnames_1.default(classes[`notification${helpers_1.capitalize(variant)}`], {
            [classes.notificationShadow]: elevated,
            [classes.notificationFullWidth]: fullWidth
        }, classes.notification, className), message: renderNotificationContent(props) })));
};
exports.Notification.defaultProps = {
    elevated: false,
    fullWidth: false,
    variant: 'white'
};
exports.Notification.displayName = 'Notification';
exports.default = styles_1.withStyles(styles_2.default)(exports.Notification);
//# sourceMappingURL=Notification.js.map