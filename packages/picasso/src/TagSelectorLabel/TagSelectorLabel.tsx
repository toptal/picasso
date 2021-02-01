import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Tag from '../Tag'
import { Props as TagProps } from '../Tag/Tag'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTagSelectorLabel'
})

export const TagSelectorLabel = forwardRef<HTMLDivElement, TagProps>(
  function TagSelectorLabel(props, ref) {
    const { children, ...rest } = props

    const classes = useStyles()

    return (
      <Tag ref={ref} className={classes.label} {...rest}>
        {children}
      </Tag>
    )
  }
)

TagSelectorLabel.defaultProps = {}

TagSelectorLabel.displayName = 'TagSelectorLabel'

export default TagSelectorLabel
