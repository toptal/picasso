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
const classnames_1 = __importDefault(require("classnames"));
const utils_1 = require("../utils");
const Container_1 = __importDefault(require("../Container"));
const HelpboxTitle_1 = __importDefault(require("../HelpboxTitle"));
const HelpboxContent_1 = __importDefault(require("../HelpboxContent"));
const HelpboxActions_1 = __importDefault(require("../HelpboxActions"));
const Icon_1 = require("../Icon");
const Button_1 = __importDefault(require("../Button"));
const styles_2 = __importDefault(require("./styles"));
exports.HelpboxContext = react_1.default.createContext({});
exports.Helpbox = (_a) => {
    var { classes, className, style, children, variant, onClose } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "variant", "onClose"]);
    return (react_1.default.createElement(Container_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { className: classnames_1.default(classes.root, className), style: style, bordered: true, variant: variant, padded: 'large' }),
        react_1.default.createElement(exports.HelpboxContext.Provider, { value: { closeable: Boolean(onClose) } }, children),
        onClose && (react_1.default.createElement(Button_1.default, { className: classes.closeButton, circular: true, onClick: onClose, icon: react_1.default.createElement(Icon_1.Close16, { color: utils_1.palette.grey.dark }) }))));
};
exports.Helpbox.defaultProps = {};
exports.Helpbox.Title = HelpboxTitle_1.default;
exports.Helpbox.Content = HelpboxContent_1.default;
exports.Helpbox.Actions = HelpboxActions_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Helpbox);
//# sourceMappingURL=Helpbox.js.map