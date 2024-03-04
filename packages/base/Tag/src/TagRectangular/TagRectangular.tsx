import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { useTitleCase } from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'

import { Indicator } from '../Indicator'
import { Chip } from '../Chip'
import styles from './styles'
import type { Props } from './types'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTagRectangular',
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
      variant = 'light-grey',
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
          icon: classes.icon,
        }}
        className={className}
        style={style}
        icon={indicator ? <Indicator color={indicator} /> : undefined}
        label={
          <span
            className={cx(classes.innerLabel, {
              [classes.innerLabelDarkText]: variant === 'light-grey',
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
  variant: 'light-grey',
}

TagRectangular.displayName = 'TagRectangular'

export default TagRectangular
