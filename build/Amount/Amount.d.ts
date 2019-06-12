import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** The amount to be formatted */
    amount: number;
    /** Currency which need to be applied on the amount (ISO format) */
    currency?: string;
}
/** Currency List: https://www.currency-iso.org/en/home/tables/table-a1.html */
export declare const Amount: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "amount" | "currency"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
