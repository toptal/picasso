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
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const ExpansionPanel_1 = __importDefault(require("@material-ui/core/ExpansionPanel"));
const ArrowDownMinor16_1 = __importDefault(require("../Icon/ArrowDownMinor16"));
const ExpansionPanelSummary_1 = __importDefault(require("../ExpansionPanelSummary"));
const ExpansionPanelDetails_1 = __importDefault(require("../ExpansionPanelDetails"));
const styles_2 = __importDefault(require("./styles"));
exports.Accordion = (_a) => {
    var { children, content, expanded, expandIcon, bordered, className, style, classes, onChange } = _a, rest = __rest(_a, ["children", "content", "expanded", "expandIcon", "bordered", "className", "style", "classes", "onChange"]);
    const ExpandIcon = expandIcon;
    return (react_1.default.createElement(ExpansionPanel_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { classes: {
            root: children
                ? classnames_1.default(classes.root, { [classes.bordered]: bordered })
                : '',
            expanded: classes.expanded
        }, className: className, style: style, elevation: 0, expanded: expanded, onChange: onChange }),
        children && (react_1.default.createElement(ExpansionPanelSummary_1.default, { classes: {
                root: classes.summary,
                content: classes.content
            }, expandIcon: expandIcon ? (
            // @ts-ignore
            react_1.default.createElement(ExpandIcon, { className: classes.expandIcon })) : (react_1.default.createElement(ArrowDownMinor16_1.default, { className: classes.expandIcon })) }, children)),
        react_1.default.createElement(ExpansionPanelDetails_1.default, { classes: {
                root: classes.details
            } }, content)));
};
exports.Accordion.defaultProps = {
    bordered: true,
    expanded: undefined,
    onChange: () => { }
};
exports.Accordion.displayName = 'Accordion';
exports.default = styles_1.withStyles(styles_2.default)(exports.Accordion);
//# sourceMappingURL=Accordion.js.map