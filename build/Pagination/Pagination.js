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
import React, { forwardRef, useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '../Button';
import Container from '../Container';
import Typography from '../Typography';
import { getRange, ELLIPSIS, FIRST_PAGE, ONE_PAGE } from './range-utils';
import styles from './styles';
const SIBLING_COUNT = 1;
const PaginationEllipsis = ({ classes }) => {
    return (React.createElement(Container, { className: classes.ellipsis },
        React.createElement(Typography, { size: 'small', weight: 'semibold', color: 'black' }, ELLIPSIS)));
};
const PaginationPage = ({ page, activePage, disabled, classes, onClick }) => {
    return (React.createElement(Button, { className: classes.rangeButton, disabled: disabled, onClick: () => onClick(page), variant: activePage === page ? 'primary-blue' : 'secondary-blue', size: 'small' }, page));
};
export const Pagination = forwardRef(function Pagination(_a, ref) {
    var { activePage, classes, disabled, totalPages, onPageChange } = _a, rest = __rest(_a, ["activePage", "classes", "disabled", "totalPages", "onPageChange"]);
    const isFirstActive = activePage === 1;
    const isLastActive = activePage === totalPages;
    if (totalPages <= ONE_PAGE) {
        return null;
    }
    const handleChange = (navigation) => {
        if (navigation === 'first') {
            return onPageChange(FIRST_PAGE);
        }
        if (navigation === 'previous') {
            return onPageChange(activePage - ONE_PAGE);
        }
        if (navigation === 'next') {
            return onPageChange(activePage + ONE_PAGE);
        }
        if (navigation === 'last') {
            return onPageChange(totalPages);
        }
        return onPageChange(navigation);
    };
    const pages = useMemo(() => getRange(activePage, totalPages, SIBLING_COUNT), [
        activePage,
        totalPages
    ]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(Container, Object.assign({}, rest, { ref: ref, flex: true, inline: true, alignItems: 'center' }),
        React.createElement(Button, { disabled: isFirstActive || disabled, onClick: () => handleChange('previous'), variant: 'secondary-blue', size: 'small' }, "Prev"),
        pages.map((page, index) => {
            if (page === ELLIPSIS) {
                return (React.createElement(PaginationEllipsis
                // eslint-disable-next-line react/no-array-index-key
                , { 
                    // eslint-disable-next-line react/no-array-index-key
                    key: 'pagination-ellipsis' + index, classes: classes }));
            }
            return (React.createElement(PaginationPage, { classes: classes, page: page, activePage: activePage, disabled: disabled, 
                // eslint-disable-next-line react/no-array-index-key
                key: page + index, onClick: handleChange }));
        }),
        React.createElement(Button, { disabled: isLastActive || disabled, onClick: () => handleChange('next'), variant: 'secondary-blue', size: 'small' }, "Next")));
});
Pagination.defaultProps = {
    disabled: false
};
Pagination.displayName = 'Pagination';
export default withStyles(styles)(Pagination);
//# sourceMappingURL=Pagination.js.map