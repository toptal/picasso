import React, { FunctionComponent } from 'react';
import { StandardProps, JssProps } from '../Picasso';
declare type NavigationType = 'first' | 'last' | 'previous' | 'next' | number;
export interface PaginationPageProps extends JssProps {
    activePage: number;
    disabled?: boolean;
    page: number;
    onClick: (page: NavigationType) => void;
}
export interface Props extends StandardProps {
    /** Value of the current highlighted page */
    activePage: number;
    /** Shows `Pagination` in disabled state when pages are not changeable */
    disabled?: boolean;
    /** Callback invoked when any page number is clicked */
    onPageChange: (page: number) => void;
    /** Value of total pages of the data set used for calculation of page buttons */
    totalPages: number;
}
export declare const Pagination: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "className" | "activePage" | "totalPages" | "onPageChange"> & import("@material-ui/core/styles").StyledComponentProps<"ellipsis" | "rangeButton">>;
export default _default;
