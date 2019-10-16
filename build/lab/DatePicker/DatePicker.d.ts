/// <reference types="react" />
import { BaseProps } from '../../Picasso';
import { Props as InputProps } from '../../Input';
import { DateOrDateRangeType } from '../Calendar';
export interface Props extends BaseProps, Omit<InputProps, 'value' | 'onSelect' | 'type' | 'autoComplete' | 'multiline' | 'rows' | 'defaultValue' | 'onChange'> {
    /** Method that will be invoked with selected values */
    onSelect: (value: DateOrDateRangeType) => void;
    /** Whether calendar supports single date selection or range */
    range?: boolean;
    /** Initial value */
    value?: Date;
}
export declare const DatePicker: {
    ({ onSelect, range, value: initialValue, width, ...rest }: Props): JSX.Element;
    defaultProps: {
        range: boolean;
    };
    displayName: string;
};
export default DatePicker;
