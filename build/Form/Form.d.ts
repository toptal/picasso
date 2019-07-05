import { FunctionComponent, FormEventHandler, ReactNode, FormHTMLAttributes } from 'react';
import FormField from '../FormField';
import FormHint from '../FormHint';
import FormLabel from '../FormLabel';
import FormError from '../FormError';
import { BaseProps } from '../Picasso';
interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
    /** Content of Form constructed of Form elements */
    children?: ReactNode;
    /** Submit handler */
    onSubmit?: FormEventHandler<HTMLFormElement>;
}
interface StaticProps {
    Field: typeof FormField;
    Hint: typeof FormHint;
    Label: typeof FormLabel;
    Error: typeof FormError;
}
export declare const Form: FunctionComponent<Props> & StaticProps;
export default Form;
