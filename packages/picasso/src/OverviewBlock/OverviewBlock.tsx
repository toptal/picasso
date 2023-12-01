/* eslint-disable import/no-extraneous-dependencies */
import type { ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type {
  OverridableComponent,
  ColorType,
  BaseProps,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { useOverviewBlockGroupContext } from '@toptal/picasso-overview-block-group/-overview-block-group-context'
import Container from '@toptal/picasso-container'
import Typography from '@toptal/picasso-typography'
import { toTitleCase, isString } from '@toptal/picasso-utils'

import styles from './styles'

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
    label: ReactNode
    /** The color variant  */
    variant?: Variant
    /** Component used for the root node. Either a string to use a DOM element or a component. */
    as?: ElementType
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent) => void
  }

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoOverviewBlock',
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
    label: 'dark-grey',
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
        {isString(label) ? (
          <Typography size='xxsmall' weight='semibold' color={color.label}>
            {titleCase ? toTitleCase(label) : label}
          </Typography>
        ) : (
          label
        )}
        <Typography size='large' weight='semibold' color={color.value}>
          {value}
        </Typography>
      </Container>
    </Component>
  )
})

OverviewBlock.defaultProps = {
  as: 'button',
}

OverviewBlock.displayName = 'OverviewBlock'

export default OverviewBlock
