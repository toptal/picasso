import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses } from '@toptal/picasso-shared'

import Tag from '../Tag'
import { Props as TagProps } from '../Tag/Tag'
import styles from './styles'

const useStyles = makeStyles<Theme, TagProps>(styles, {
  name: 'PicassoTagSelectorLabel'
})

export const TagSelectorLabel = forwardRef<HTMLDivElement, TagProps>(
  function TagSelectorLabel(props, ref) {
    const { children, classes: externalClasses, ...rest } = props

    const classes = mergeClasses(useStyles(props), externalClasses)

    return (
      <Tag
        ref={ref}
        className={classes.label}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)

TagSelectorLabel.defaultProps = {}

TagSelectorLabel.displayName = 'TagSelectorLabel'

export default TagSelectorLabel
