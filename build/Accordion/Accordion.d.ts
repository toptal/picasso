import {
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
  FunctionComponent
} from 'react'
import { CompoundedComponentWithRef, StandardProps } from '../Picasso'
declare const Summary: FunctionComponent
declare const Details: FunctionComponent<{
  className: string
}>
interface StaticProps {
  Summary: typeof Summary
  Details: typeof Details
}
export interface Props
  extends Partial<StandardProps>,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Always visible part of accordion */
  children?: ReactNode
  /** Collapsible content of `Accordion` */
  content: ReactNode
  /** Define accordion content state, whether it should be collapsed or expanded */
  expanded?: boolean
  /** Define accordion initial content state */
  defaultExpanded?: boolean
  /** Whether the Accordion is disabled */
  disabled?: boolean
  /** Customize icon indicating expanded status */
  expandIcon?: ReactElement
  /** Defines if the horizontal borders show */
  bordered?: boolean
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void
}
export declare const Accordion: CompoundedComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
export default Accordion
