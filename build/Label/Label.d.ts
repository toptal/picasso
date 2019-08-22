import {
  FunctionComponent,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import LabelGroup from '../LabelGroup'
import { StandardProps, PicassoComponent } from '../Picasso'
declare type VariantType = 'grey' | 'white'
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Text content of the `Label` component */
  children: ReactNode
  /** Specify the icon which should be rendered inside Label */
  icon?: ReactElement
  /** Defines if `Label` is disabled */
  disabled?: boolean
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
   */
  onDelete?: () => void
  /** Variant of the `Label` */
  variant?: VariantType
}
interface StaticProps {
  Group: typeof LabelGroup
}
export declare const Label: FunctionComponent<Props> & StaticProps
declare const _default: PicassoComponent<Props, StaticProps>
export default _default
