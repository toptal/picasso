"use strict";
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
const notistack_1 = require("notistack");
const styles_1 = require("@material-ui/core/styles");
const Notification_1 = __importDefault(require("../../Notification"));
const styles_2 = __importDefault(require("./styles"));
const defaultPosition = {
    vertical: 'top',
    horizontal: 'right'
};
const StyledNotification = styles_1.withStyles(styles_2.default)(
// eslint-disable-next-line react/display-name
react_1.forwardRef(function Notification({ content, icon, key, onClose, variant = 'white', classes }, ref) {
    return (react_1.default.createElement(Notification_1.default, { variant: variant, elevated: true, icon: icon, key: key, onClose: onClose, className: classnames_1.default({
            [classes.generalNotification]: variant === 'white',
            [classes.formNotification]: variant !== 'white'
        }), ref: ref }, content));
}));
exports.useNotifications = () => {
    const { enqueueSnackbar, closeSnackbar } = notistack_1.useSnackbar();
    const getNotification = (variant) => (content, icon, options) => {
        const closeNotification = () => {
            if (!notificationId) {
                return;
            }
            closeSnackbar(notificationId);
        };
        const notificationId = enqueueSnackbar('', Object.assign({ anchorOrigin: defaultPosition, 
            // eslint-disable-next-line react/display-name
            children: (key) => (react_1.default.createElement(StyledNotification, { content: content, icon: icon, key: key, variant: variant, onClose: closeNotification })) }, options));
        return notificationId;
    };
    const showCustomNotification = (Content, position, options) => enqueueSnackbar('', Object.assign({ anchorOrigin: position || defaultPosition, 
        // eslint-disable-next-line react/display-name
        children: (key) => react_1.default.cloneElement(Content, { key }) }, options));
    return {
        showError: getNotification('red'),
        showInfo: getNotification(),
        showSuccess: getNotification('green'),
        showCustomNotification: showCustomNotification,
        closeNotification: closeSnackbar
    };
};
//# sourceMappingURL=use-notifications.js.map