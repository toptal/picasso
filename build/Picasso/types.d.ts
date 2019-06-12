import { CSSProperties, FunctionComponent, SyntheticEvent } from 'react';
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
declare type EventListenerType = (event: SyntheticEvent<HTMLElement>) => void;
export interface TooltipEventListeners {
    onBlur?: EventListenerType;
    onFocus?: EventListenerType;
    onMouseLeave?: EventListenerType;
    onMouseOver?: EventListenerType;
    onTouchEnd?: EventListenerType;
    onTouchStart?: EventListenerType;
}
declare type Sizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export declare type SizeType<T extends Sizes> = T;
export declare type SpacingType = number | SizeType<'xsmall' | 'small' | 'medium' | 'large'>;
export declare const spacingToEm: (spacing: SpacingType) => string;
export {};
