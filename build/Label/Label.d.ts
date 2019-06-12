import { FunctionComponent, ReactNode, ReactElement } from 'react';
import LabelGroup from '../LabelGroup';
import { StandardProps, PicassoComponent, TooltipEventListeners } from '../Picasso';
export interface Props extends StandardProps, TooltipEventListeners {
    /** Text content of the `Label` component */
    children: ReactNode;
    /** A callback which is invoked after remove `Icon` is clicked
     *
     * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
     */
    onDelete?: () => void;
    /** Specify the icon which should be rendered inside Label */
    icon?: ReactElement;
}
interface StaticProps {
    Group: typeof LabelGroup;
}
export declare const Label: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
