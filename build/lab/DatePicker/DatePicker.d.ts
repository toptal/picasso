/// <reference types="react" />
import { BaseProps } from '../../Picasso';
import { DateOrDateRangeType } from '../Calendar';
export interface Props extends BaseProps {
    /** Method that will be invoked with selected values */
    onSelect: (value: DateOrDateRangeType) => void;
    /** Whether calendar supports single date selection or range */
    range?: boolean;
    /** Initial value */
    value?: Date;
}
export declare const DatePicker: {
    ({ onSelect, range, value: initialValue }: Props): JSX.Element;
    defaultProps: {
        range: boolean;
    };
    displayName: string;
};
export default DatePicker;
