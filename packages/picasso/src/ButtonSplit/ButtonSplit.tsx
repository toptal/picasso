import React, { forwardRef, useState, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Button from '../Button'
import { ArrowUpMinor24, ArrowDownMinor24 } from '../Icon'
import styles from './styles'

interface Props {
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoButtonSplit' })

const ButtonSplit = forwardRef<HTMLDivElement, Props>(function ButtonSplit(props, ref) {
  const [isContentShown, setIsContentShown] = useState(false)
  const classes = useStyles()
  const { className, disabled, style, children, size, ...rest } = props

  const handleArrowButtonClick = () => {
    setIsContentShown(isShown => !isShown)
  }

  return (
    <Button.Group ref={ref} style={style} className={className} {...rest}>
      <Button disabled variant='secondary'>{children}</Button>
      <Button style={{ minWidth: '3rem' }} disabled variant='secondary' onClick={handleArrowButtonClick}>{isContentShown ? <ArrowUpMinor24 /> : <ArrowDownMinor24 />}</Button>
    </Button.Group>
  )
})

ButtonSplit.defaultProps = {
  size: 'medium'
}

export default ButtonSplit
