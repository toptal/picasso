import React, { FunctionComponent, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIList from '@material-ui/core/List'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLUListElement> {}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoList' })

const List: FunctionComponent<Props> = props => {
  const { classes: externalClasses, className, style, ...rest } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MUIList {...rest} classes={classes} className={className} style={style} />
  )
}

export default List
