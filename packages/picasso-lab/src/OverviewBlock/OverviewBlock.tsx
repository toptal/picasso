import React, {
  forwardRef,
  ElementType,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  ComponentPropsWithoutRef
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  CompoundedComponentWithRef,
  OverridableComponent,
  ColorType,
  BaseProps,
  TextLabelProps,
  useTitleCase
} from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso'
import { toTitleCase } from '@toptal/picasso/utils'

import styles from './styles'
import { useOverviewBlockGroupContext } from '../OverviewBlockGroup/OverviewBlockGroupContext'
import OverviewBlockGroup from '../OverviewBlockGroup'
import OverviewBlockRow from '../OverviewBlockRow'

type Variant =
  | 'value-red'
  | 'value-green'
  | 'value-blue'
  | 'value-yellow'
  | 'label-red'
  | 'label-green'
  | 'label-blue'
  | 'label-yellow'

type ColorSettings = {
  value: ColorType
  label: ColorType
}

export type Props = BaseProps &
  TextLabelProps &
  HTMLAttributes<HTMLButtonElement> & {
    /** Counter value  */
    value: ReactNode
    /** Counter title  */
    label: string
    /** The color variant  */
    variant?: Variant
    /** Component used for the root node. Either a string to use a DOM element or a component. */
    as?: ElementType
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent) => void
  }

export interface StaticProps {
  Group: FunctionComponent<ComponentPropsWithoutRef<typeof OverviewBlockGroup>>
  Row: FunctionComponent<ComponentPropsWithoutRef<typeof OverviewBlockRow>>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoOverviewBlock'
})

export const OverviewBlock: OverridableComponent<Props> & StaticProps =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, Props>(function OverviewBlock(props, ref) {
    const {
      value,
      label,
      variant,
      as,
      className,
      onClick,
      titleCase: propsTitleCase,
      ...rest
    } = props
    const classes = useStyles()
    const { align, blockWidth } = useOverviewBlockGroupContext()

    const color: ColorSettings = {
      value: 'black',
      label: 'dark-grey'
    }

    if (variant) {
      const [partName, colorName] = variant.split('-') as [
        keyof ColorSettings,
        ColorType
      ]

      color[partName] = colorName
    }

    const isClickable = Boolean(onClick)

    const Component = isClickable && as ? as : 'div'

    const titleCase = useTitleCase(propsTitleCase)

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(
          { [classes.clickable]: isClickable },
          { [classes.disableOutline]: !isClickable },
          classes[`${align}Align`],
          classes[`${blockWidth}Width`],
          classes.root,
          className
        )}
        onClick={onClick}
      >
        <Typography
          size='small'
          weight='semibold'
          className={classes.title}
          color={color.label}
        >
          {titleCase ? toTitleCase(label) : label}
        </Typography>
        <Typography size='large' weight='semibold' color={color.value}>
          {value}
        </Typography>
      </Component>
    )
  }) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

OverviewBlock.defaultProps = {
  as: 'button'
}

OverviewBlock.Group = OverviewBlockGroup
OverviewBlock.Row = OverviewBlockRow
OverviewBlock.displayName = 'OverviewBlock'

export default OverviewBlock
