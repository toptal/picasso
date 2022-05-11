import React, {
  forwardRef,
  ElementType,
  HTMLAttributes,
  MouseEvent,
  ReactNode
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  OverridableComponent,
  ColorType,
  BaseProps,
  TextLabelProps,
  useTitleCase
} from '@toptal/picasso-shared'

import styles from './styles'
import { useOverviewBlockGroupContext } from '../OverviewBlockGroup/OverviewBlockGroupContext'
import OverviewBlockGroup from '../OverviewBlockGroup'
import OverviewBlockRow from '../OverviewBlockRow'
import Container from '../Container'
import Typography from '../Typography'
import { toTitleCase } from '../utils'

type VariantColorType = Extract<ColorType, 'red' | 'green' | 'yellow'>

type Variant = `value-${VariantColorType}` | `label-${VariantColorType}`

type ColorSchema = {
  value: ColorType
  label: ColorType
}

export type Props = BaseProps &
  TextLabelProps &
  Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
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

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoOverviewBlock'
})

export const OverviewBlock: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function OverviewBlock(props, ref) {
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

  const color: ColorSchema = {
    value: 'black',
    label: 'dark-grey'
  }

  if (variant) {
    const [partName, colorName] = variant.split('-') as [
      keyof ColorSchema,
      ColorType
    ]

    color[partName] = colorName
  }

  const isClickable = Boolean(onClick) || typeof as !== 'string'

  const Component = isClickable && as ? as : 'div'

  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Component
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
      <Container align='left'>
        <Typography size='xxsmall' weight='semibold' color={color.label}>
          {titleCase ? toTitleCase(label) : label}
        </Typography>
        <Typography size='large' weight='semibold' color={color.value}>
          {value}
        </Typography>
      </Container>
    </Component>
  )
})

OverviewBlock.defaultProps = {
  as: 'button'
}

OverviewBlock.displayName = 'OverviewBlock'

export default Object.assign(OverviewBlock, {
  Group: OverviewBlockGroup,
  Row: OverviewBlockRow
})
