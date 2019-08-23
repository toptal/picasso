import React, { ChangeEvent } from 'react';
import { Props as SelectProps } from '../../Select';
import { JssProps, OmitInternalProps } from '../../Picasso';
declare type AdjustedSelectProps = OmitInternalProps<Omit<SelectProps, 'onChange' | 'options'>> & Partial<JssProps>;
export interface Props extends AdjustedSelectProps {
    /** a year select starts from. e.g. 2017 */
    from: number;
    /** a year select ends at. e.g. 2019 */
    to: number;
    /** Callback invoked when picker changes its state. */
    onChange: (event: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => void;
}
export declare const YearSelect: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export default YearSelect;
