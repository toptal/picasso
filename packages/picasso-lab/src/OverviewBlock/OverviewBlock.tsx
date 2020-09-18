import React, {
  forwardRef,
  ElementType,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  ReactNode
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
    /** Value and label alignment. By default content is aligned to the left. */
    align?: 'default' | 'center'
    /** Component used for the root node. Either a string to use a DOM element or a component. */
    as?: ElementType
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent) => void
  }

export interface StaticProps {
  Group: FunctionComponent
  Row: FunctionComponent
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOverviewBlock'
})

export const OverviewBlock: OverridableComponent<Props> & StaticProps =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, Props>(function OverviewBlock(props, ref) {
    const {
      value,
      label,
      variant,
      align = 'default',
      as: Component = 'button',
      className,
      onClick,
      titleCase: propsTitleCase,
      ...rest
    } = props
    const classes = useStyles(props)

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

    const titleCase = useTitleCase(propsTitleCase)

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(
          { [classes.clickable]: isClickable },
          { [classes.disableOutline]: !isClickable },
          {
            [classes[`${align}Align`]]: align
          },
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
  align: 'default',
  as: 'button'
}

OverviewBlock.Group = OverviewBlockGroup
OverviewBlock.Row = OverviewBlockRow
OverviewBlock.displayName = 'OverviewBlock'

export default OverviewBlock
