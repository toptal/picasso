import { FunctionComponent } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import { PicassoComponent, StandardProps, ButtonOrAnchorProps } from '../Picasso';
export interface Props extends StandardProps, Omit<ButtonOrAnchorProps, 'onChange' | 'value'> {
    /** Text label for the `Radio` */
    label?: string;
    /** Value of the `Radio` component used with conjuction of `Radio.Group` */
    value?: string | number | boolean;
    /** Defines if `Radio` is disabled */
    disabled?: boolean;
    /** Defines if `Radio` is checked by default */
    checked?: boolean;
    /** Callback invoked when `Radio` changes its state */
    onChange?: (event: object, checked: boolean) => void;
}
interface StaticProps {
    Group: typeof RadioGroup;
}
export declare const Radio: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
