import React from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'
import type { AvatarSizeType, VariantType } from '../Avatar'

export type Props = {
  className?: string
  size: AvatarSizeType
  variant: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoImagePlaceholder'
})

const ImagePlaceholder = (props: Props) => {
  const { className } = props
  const classes = useStyles(props)

  return <div className={cx(classes.root, className)} />
}

export default ImagePlaceholder
