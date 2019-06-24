"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const ExpansionPanel_1 = __importDefault(require("@material-ui/core/ExpansionPanel"));
const ChevronRight_1 = __importDefault(require("@material-ui/icons/ChevronRight"));
const ExpansionPanelSummary_1 = __importDefault(require("../ExpansionPanelSummary"));
const ExpansionPanelDetails_1 = __importDefault(require("../ExpansionPanelDetails"));
const styles_2 = __importDefault(require("./styles"));
exports.Accordion = ({ children, content, expanded, className, style, classes, onChange }) => {
    return (react_1.default.createElement(ExpansionPanel_1.default, { classes: {
            root: children ? classes.root : '',
            expanded: classes.expanded
        }, className: className, style: style, elevation: 0, expanded: expanded, onChange: onChange },
        children && (react_1.default.createElement(ExpansionPanelSummary_1.default, { classes: {
                root: classes.summary
            }, expandIcon: react_1.default.createElement(ChevronRight_1.default, { className: classes.expandIcon }) }, children)),
        react_1.default.createElement(ExpansionPanelDetails_1.default, { classes: {
                root: classes.details
            } }, content)));
};
exports.Accordion.defaultProps = {
    expanded: undefined,
    onChange: () => { }
};
exports.Accordion.displayName = 'Accordion';
exports.default = styles_1.withStyles(styles_2.default)(exports.Accordion);
//# sourceMappingURL=Accordion.js.map