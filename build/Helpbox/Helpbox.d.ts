import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react';
import { StandardProps, PicassoComponent } from '../Picasso';
import { VariantType as ContainerVariantType } from '../Container';
import HelpboxTitle from '../HelpboxTitle';
import HelpboxContent from '../HelpboxContent';
import HelpboxActions from '../HelpboxActions';
import { HelpboxContextProps } from './types';
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
    /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
    children: ReactNode;
    /** Color variant of Helpbox */
    variant?: ContainerVariantType;
    /** Callback invoked when close is clicked */
    onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
interface StaticProps {
    Title: typeof HelpboxTitle;
    Content: typeof HelpboxContent;
    Actions: typeof HelpboxActions;
}
export declare const HelpboxContext: React.Context<HelpboxContextProps>;
export declare const Helpbox: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
