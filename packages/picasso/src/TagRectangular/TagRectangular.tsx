import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import Indicator, { IndicatorProps } from '../Indicator'
import Chip from '../Chip'
import toTitleCase from '../utils/to-title-case'
import styles from './styles'

export type VariantType = 'negative' | 'warning' | 'positive' | 'dark' | 'light'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

interface VariantOnlyProps extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** Variant of the rectangular `Tag`, can not be used with the `indicator` property at the same time. */
  variant?: VariantType
  /** Indicator color, can not be used with the `variant` property at the same time. The Tag's `variant` property is automatically set to `light-grey` when indicator color is set. */
  indicator?: never
}

interface IndicatorOnlyProps
  extends BaseProps,
    TextLabelProps,
    DivOrAnchorProps {
  variant?: never
  indicator: IndicatorProps['color']
}

export type Props = VariantOnlyProps | IndicatorOnlyProps

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTagRectangular'
})

export const TagRectangular = forwardRef<HTMLDivElement, Props>(
  function TagRectangular(props, ref) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      color,
      children,
      style,
      className,
      titleCase: propsTitleCase,
      variant = 'light',
      indicator,
      ...rest
    } = props

    const classes = useStyles()
    const titleCase = useTitleCase(propsTitleCase)

    return (
      <Chip
        {...rest}
        ref={ref}
        classes={{
          root: cx(classes.root, classes[variant]),
          label: classes.label,
          icon: classes.icon
        }}
        className={className}
        style={style}
        icon={indicator ? <Indicator color={indicator} /> : undefined}
        label={
          <span
            className={cx(classes.innerLabel, {
              [classes.innerLabelDarkText]: variant === 'light'
            })}
          >
            {titleCase ? toTitleCase(children) : children}
          </span>
        }
      />
    )
  }
)

TagRectangular.defaultProps = {
  variant: 'light'
}

TagRectangular.displayName = 'TagRectangular'

export default TagRectangular
