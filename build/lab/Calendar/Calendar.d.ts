/// <reference types="react" />
import { BaseProps } from '../../Picasso';
export declare type DateOrDateRangeType = Date | DateRangeType;
export declare type DateRangeType = [Date, Date];
export interface Props extends BaseProps {
    onSelect: (value: DateOrDateRangeType) => void;
    range?: boolean;
    value?: Date;
    open?: boolean;
    activeMonth?: Date;
}
export declare const Calendar: {
    (props: Props): JSX.Element | null;
    displayName: string;
};
export default Calendar;
