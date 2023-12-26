import React from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import Button from '../Button'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPaginationButton',
})

export interface Props extends StandardProps {
  activePage: number
  disabled?: boolean
  page: number
  onClick: (page: number) => void
}

const PaginationButton = (props: Props) => {
  const { page, activePage, disabled, onClick, className } = props
  const classes = useStyles()
  const isActive = page === activePage

  return (
    <Button
      className={cx(classes.root, { [classes.active]: isActive }, className)}
      aria-current={isActive ? true : undefined}
      active={isActive}
      disabled={disabled}
      onClick={() => onClick(page)}
      variant='secondary'
      size='small'
    >
      {page}
    </Button>
  )
}

export default PaginationButton
