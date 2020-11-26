import React, {
  forwardRef,
  ElementType,
  HTMLAttributes,
  AnchorHTMLAttributes
} from 'react'
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import Indicator, { IndicatorProps } from '../Indicator'
import Chip from '../Chip'
import toTitleCase from '../utils/to-title-case'
import styles from './styles'

export type ColorType = 'red' | 'yellow' | 'dark-grey' | 'light-grey'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

export interface Props extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** The component used for the root node. Either a string to use, a DOM element or a component. */
  as?: ElementType
  /** Color of the rectangular `Tag`, can not be used with the `indicator` property at the same time. */
  color?: ColorType
  /** Indicator color, can not be used with the `color` property at the same time. The Tag's `color` property is automatically set to `light-grey` when indicator color is set. */
  indicator?: IndicatorProps['color']
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTagRectangular'
})

export const TagRectangular = forwardRef<HTMLDivElement, Props>(
  function TagRectangular(props, ref) {
    const {
      children,
      style,
      className,
      as,
      titleCase: propsTitleCase,
      ...rest
    } = props

    const { color, indicator, ...htmlAttributes } = rest

    if (indicator && color !== 'light-grey') {
      throw new Error(
        '"indicator" and "color" properties should not be specified at the same time'
      )
    }

    const classes = useStyles(props)
    const titleCase = useTitleCase(propsTitleCase)

    return (
      <Chip
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...htmlAttributes}
        ref={ref}
        classes={{
          root: cx(classes.root, classes[color!]),
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
        component={as!}
      />
    )
  }
)

TagRectangular.defaultProps = {
  color: 'light-grey'
}

TagRectangular.displayName = 'TagRectangular'

export default withStyles(styles)(TagRectangular)
