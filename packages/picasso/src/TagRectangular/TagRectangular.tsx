import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import Indicator, { IndicatorProps } from '../Indicator'
import Chip from '../Chip'
import toTitleCase from '../utils/to-title-case'
import styles from './styles'
import { dashToCamelCase } from '../utils'

export type ColorType = 'red' | 'yellow' | 'dark-grey' | 'light-grey'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

interface ColorOnlyProps extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** Color of the rectangular `Tag`, can not be used with the `indicator` property at the same time. */
  color?: ColorType
  /** Indicator color, can not be used with the `color` property at the same time. The Tag's `color` property is automatically set to `light-grey` when indicator color is set. */
  indicator?: never
}

interface IndicatorOnlyProps
  extends BaseProps,
    TextLabelProps,
    DivOrAnchorProps {
  color?: never
  indicator: IndicatorProps['color']
}

export type Props = ColorOnlyProps | IndicatorOnlyProps

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTagRectangular'
})

export const TagRectangular = forwardRef<HTMLDivElement, Props>(
  function TagRectangular(props, ref) {
    const {
      children,
      style,
      className,
      titleCase: propsTitleCase,
      color,
      indicator,
      ...rest
    } = props

    const classes = useStyles(props)
    const titleCase = useTitleCase(propsTitleCase)

    return (
      <Chip
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        classes={{
          root: cx(classes.root, classes[dashToCamelCase(color!)]),
          label: classes.label,
          icon: classes.icon
        }}
        className={className}
        style={style}
        icon={indicator ? <Indicator color={indicator} /> : undefined}
        label={
          <span
            className={cx(classes.innerLabel, {
              [classes.innerLabelDarkText]: color === 'light-grey'
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
  color: 'light-grey'
}

TagRectangular.displayName = 'TagRectangular'

export default TagRectangular
