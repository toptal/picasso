import React, { ChangeEvent } from 'react';
import { Props as SelectProps } from '../../Select';
import { JssProps, OmitInternalProps } from '../../Picasso';
declare type AdjustedSelectProps = OmitInternalProps<Omit<SelectProps, 'onChange' | 'options'>> & Partial<JssProps>;
export interface Props extends AdjustedSelectProps {
    /** a number of month select starts from. e.g. 5 for May */
    from?: number;
    /** a number of month select ends at. e.g. 11 for November */
    to?: number;
    /** Callback invoked when picker changes its state. */
    onChange: (event: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => void;
}
export declare const MonthSelect: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export default MonthSelect;
