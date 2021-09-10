import React from 'react'
import { StandardProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import Button from '../Button'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPaginationButton'
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

  return (
    <Button
      className={cx(
        classes.root,
        { [classes.active]: page === activePage },
        className
      )}
      active={activePage === page}
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
