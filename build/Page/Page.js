"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const PageHeader_1 = __importDefault(require("../PageHeader"));
const PageHeaderMenu_1 = __importDefault(require("../PageHeaderMenu"));
const PageFooter_1 = __importDefault(require("../PageFooter"));
const PageContent_1 = __importDefault(require("../PageContent"));
const styles_2 = __importDefault(require("./styles"));
exports.PageContext = react_1.default.createContext({});
exports.Page = ({ children, classes, className, style, fullWidth }) => (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className), style: style },
    react_1.default.createElement(exports.PageContext.Provider, { value: { fullWidth } }, children)));
exports.Page.defaultProps = {
    fullWidth: false
};
exports.Page.displayName = 'Page';
exports.Page.Header = PageHeader_1.default;
exports.Page.HeaderMenu = PageHeaderMenu_1.default;
exports.Page.Content = PageContent_1.default;
exports.Page.Footer = PageFooter_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Page);
//# sourceMappingURL=Page.js.map