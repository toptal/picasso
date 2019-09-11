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
const ExpansionPanel_1 = __importDefault(require("@material-ui/core/ExpansionPanel"));
const Icon_1 = require("../Icon");
const ExpansionPanelSummary_1 = __importDefault(require("../ExpansionPanelSummary"));
const ExpansionPanelDetails_1 = __importDefault(require("../ExpansionPanelDetails"));
const styles_2 = __importDefault(require("./styles"));
exports.Accordion = react_1.forwardRef(function Accordion(_a, ref) {
    var { children, content, expanded, expandIcon, bordered, disabled, className, style, classes, onChange } = _a, rest = __rest(_a, ["children", "content", "expanded", "expandIcon", "bordered", "disabled", "className", "style", "classes", "onChange"]);
    return (react_1.default.createElement(ExpansionPanel_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: children ? classnames_1.default(classes.root, { [classes.bordered]: bordered }) : ''
        }, className: className, style: style, elevation: 0, expanded: expanded, disabled: disabled, onChange: onChange }),
        children ? (react_1.default.createElement(ExpansionPanelSummary_1.default, { classes: {
                root: classes.summary,
                content: classes.content
            }, expandIcon: expandIcon || react_1.default.createElement(Icon_1.ArrowDownMinor16, { className: classes.expandIcon }) }, children)) : (react_1.default.createElement(react_1.default.Fragment, null)),
        react_1.default.createElement(ExpansionPanelDetails_1.default, { classes: {
                root: classes.details
            } }, content)));
});
exports.Accordion.defaultProps = {
    bordered: true,
    defaultExpanded: false,
    disabled: false,
    expanded: undefined,
    onChange: () => { }
};
exports.Accordion.displayName = 'Accordion';
exports.default = styles_1.withStyles(styles_2.default)(exports.Accordion);
//# sourceMappingURL=Accordion.js.map