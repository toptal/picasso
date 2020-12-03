import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses } from '@toptal/picasso-shared'

import Label from '../Label'
import { Props as LabelProps } from '../Label/Label'
import styles from './styles'

const useStyles = makeStyles<Theme, LabelProps>(styles, {
  name: 'PicassoTagSelectorLabel'
})

export const TagSelectorLabel = forwardRef<HTMLDivElement, LabelProps>(
  function TagSelectorLabel(props, ref) {
    const { children, classes: externalClasses, ...rest } = props

    const classes = mergeClasses(useStyles(props), externalClasses)

    return (
      <Label
        ref={ref}
        className={classes.label}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {children}
      </Label>
    )
  }
)

TagSelectorLabel.defaultProps = {}

TagSelectorLabel.displayName = 'TagSelectorLabel'

export default TagSelectorLabel
