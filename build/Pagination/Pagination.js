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
const styles_1 = require("@material-ui/core/styles");
const Button_1 = __importDefault(require("../Button"));
const Container_1 = __importDefault(require("../Container"));
const Typography_1 = __importDefault(require("../Typography"));
const range_utils_1 = require("./range-utils");
const styles_2 = __importDefault(require("./styles"));
const SIBLING_COUNT = 1;
const PaginationEllipsis = ({ classes }) => {
    return (react_1.default.createElement(Container_1.default, { className: classes.ellipsis },
        react_1.default.createElement(Typography_1.default, { size: 'small', weight: 'semibold', color: 'black' }, range_utils_1.ELLIPSIS)));
};
const PaginationPage = ({ page, activePage, disabled, classes, onClick }) => {
    return (react_1.default.createElement(Button_1.default, { className: classes.rangeButton, disabled: disabled, onClick: () => onClick(page), variant: activePage === page ? 'primary-blue' : 'secondary-blue', size: 'small' }, page));
};
exports.Pagination = ({ activePage, classes, disabled, totalPages, onPageChange }) => {
    const isFirstActive = activePage === 1;
    const isLastActive = activePage === totalPages;
    if (totalPages <= range_utils_1.ONE_PAGE) {
        return null;
    }
    const handleChange = (navigation) => {
        if (navigation === 'first') {
            return onPageChange(range_utils_1.FIRST_PAGE);
        }
        if (navigation === 'previous') {
            return onPageChange(activePage - range_utils_1.ONE_PAGE);
        }
        if (navigation === 'next') {
            return onPageChange(activePage + range_utils_1.ONE_PAGE);
        }
        if (navigation === 'last') {
            return onPageChange(totalPages);
        }
        return onPageChange(navigation);
    };
    const pages = react_1.useMemo(() => range_utils_1.getRange(activePage, totalPages, SIBLING_COUNT), [
        activePage,
        totalPages
    ]);
    return (react_1.default.createElement(Container_1.default, { flex: true, inline: true, alignItems: 'center' },
        react_1.default.createElement(Button_1.default, { disabled: isFirstActive || disabled, onClick: () => handleChange('previous'), variant: 'secondary-blue', size: 'small' }, "Prev"),
        pages.map((page, index) => {
            if (page === range_utils_1.ELLIPSIS) {
                return react_1.default.createElement(PaginationEllipsis, { classes: classes });
            }
            return (react_1.default.createElement(PaginationPage, { classes: classes, page: page, activePage: activePage, disabled: disabled, 
                // eslint-disable-next-line react/no-array-index-key
                key: page + index, onClick: handleChange }));
        }),
        react_1.default.createElement(Button_1.default, { disabled: isLastActive || disabled, onClick: () => handleChange('next'), variant: 'secondary-blue', size: 'small' }, "Next")));
};
exports.Pagination.defaultProps = {
    disabled: false
};
exports.Pagination.displayName = 'Pagination';
exports.default = styles_1.withStyles(styles_2.default)(exports.Pagination);
//# sourceMappingURL=Pagination.js.map