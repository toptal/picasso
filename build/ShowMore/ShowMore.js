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
const styles_1 = require("@material-ui/core/styles");
const react_truncate_1 = __importDefault(require("react-truncate"));
const ChevronRight16_1 = __importDefault(require("../Icon/ChevronRight16"));
const Typography_1 = __importDefault(require("../Typography"));
const Link_1 = __importDefault(require("../Link"));
const styles_2 = __importDefault(require("./styles"));
exports.ShowMore = react_1.forwardRef(function ShowMore({ children, rows = 4, initialExpanded = false, disableToggle = false, classes: { expandedIcon, icon, toggleText, iconWrapper }, moreText = 'Show more', lessText = 'Show less', onToggle = () => { } }, ref) {
    const [shownMore, setShownMore] = react_1.useState(initialExpanded);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, { ref: ref, size: 'medium', color: 'dark-grey' },
            react_1.default.createElement(react_truncate_1.default, { lines: !shownMore && rows }, children)),
        !disableToggle && (react_1.default.createElement(Link_1.default, { onClick: () => {
                setShownMore(!shownMore);
                onToggle();
            }, className: toggleText, underline: 'none' },
            react_1.default.createElement(Typography_1.default, { size: 'medium', color: 'blue' }, shownMore ? lessText : moreText),
            react_1.default.createElement("div", { className: iconWrapper },
                react_1.default.createElement(ChevronRight16_1.default, { className: classnames_1.default(icon, {
                        [expandedIcon]: shownMore
                    }) }))))));
});
exports.ShowMore.displayName = 'ShowMore';
exports.default = styles_1.withStyles(styles_2.default)(exports.ShowMore);
//# sourceMappingURL=ShowMore.js.map