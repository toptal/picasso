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
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const Icon_1 = require("../Icon");
const ModalTitle_1 = __importDefault(require("../ModalTitle"));
const ModalContent_1 = __importDefault(require("../ModalContent"));
const ModalActions_1 = __importDefault(require("../ModalActions"));
const Picasso_1 = require("../Picasso");
const styles_2 = __importDefault(require("./styles"));
// eslint-disable-next-line react/display-name
exports.Modal = react_1.forwardRef(function Modal(_a, ref) {
    var { children, open, onBackdropClick, onClose, onOpen, classes, className, style, container, hideBackdrop, transitionDuration, paperProps } = _a, rest = __rest(_a, ["children", "open", "onBackdropClick", "onClose", "onOpen", "classes", "className", "style", "container", "hideBackdrop", "transitionDuration", "paperProps"]);
    const { closeButton } = classes, restClasses = __rest(classes, ["closeButton"]);
    const picassoRootContainer = Picasso_1.usePicassoRoot();
    return (react_1.default.createElement(Dialog_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: restClasses, className: className, style: style, container: container || picassoRootContainer, PaperProps: Object.assign({}, paperProps, { elevation: 2 }), hideBackdrop: hideBackdrop, onBackdropClick: onBackdropClick, onClose: onClose, onEnter: onOpen, open: open, transitionDuration: transitionDuration }),
        children,
        onClose && (react_1.default.createElement("span", { onClick: onClose },
            react_1.default.createElement(Icon_1.CloseMinor16, { className: closeButton })))));
});
exports.Modal.defaultProps = {
    hideBackdrop: false,
    transitionDuration: 300
};
exports.Modal.displayName = 'Modal';
exports.Modal.Content = ModalContent_1.default;
exports.Modal.Actions = ModalActions_1.default;
exports.Modal.Title = ModalTitle_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Modal);
//# sourceMappingURL=Modal.js.map