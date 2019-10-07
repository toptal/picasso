import { CSSProperties, FunctionComponent, AnchorHTMLAttributes, ButtonHTMLAttributes, RefAttributes, ForwardRefExoticComponent, ElementType, ComponentPropsWithRef } from 'react';
import { Classes } from '../styles/types';
export interface BaseProps {
    /** Classnames applied to root element */
    className?: string;
    /** Style applied to root element */
    style?: CSSProperties;
}
export interface JssProps {
    classes: Classes;
}
export declare type StandardProps = BaseProps & JssProps;
export declare type OmitInternalProps<T, K = ''> = Pick<T, Exclude<keyof T, keyof JssProps | K>>;
export declare type PicassoComponent<P, S = {}> = FunctionComponent<OmitInternalProps<P> & Partial<JssProps>> & S;
export declare type PicassoComponentWithRef<P, R, S = {}> = FunctionComponent<OmitInternalProps<P> & Partial<JssProps> & RefAttributes<R>> & S;
export declare type CompoundedComponentWithRef<P, R, S = {}> = ForwardRefExoticComponent<P & RefAttributes<R>> & S;
declare type PropsWithOverridableAs<T extends ElementType, P> = Omit<P, 'as'> & {
    as?: T;
} & ComponentPropsWithRef<T>;
interface NamedComponent<P> {
    defaultProps?: Partial<P>;
    displayName?: string;
}
export interface OverridableComponent<P = {}> extends NamedComponent<P> {
    <T extends ElementType = ElementType<Omit<P, 'as'>>>(props: PropsWithOverridableAs<T, P>): JSX.Element | null;
}
declare type Sizes = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export declare type SizeType<T extends Sizes> = T;
export declare type SpacingType = number | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>;
export declare enum SpacingEnum {
    xsmall = 0.5,
    small = 1,
    medium = 1.5,
    large = 2,
    xlarge = 2.5
}
export declare const spacingToEm: (spacing: SpacingType) => string;
export declare type ButtonOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>;
export declare type ColorType = 'blue' | 'green' | 'red' | 'yellow' | 'light-grey' | 'grey' | 'dark-grey' | 'black' | 'inherit';
export {};
