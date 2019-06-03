import React, { FunctionComponent, useMemo, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '../Button'
import Container from '../Container'
import Typography from '../Typography'
import { StandardProps, JssProps } from '../Picasso'
import { getRange, ELLIPSIS, FIRST_PAGE, ONE_PAGE } from './range-utils'
import styles from './styles'

type NavigationType = 'first' | 'last' | 'previous' | 'next' | number

const SIBLING_COUNT = 1

export interface Props extends StandardProps {
  /** Value of the current highlighted page */
  activePage: number
  /** Shows `Pagination` in disabled state when pages are not changeable */
  disabled?: boolean
  /** Callback invoked when any page number is clicked */
  onPageChange: (page: number) => void
  /** Value of total pages of the data set used for calculation of page buttons */
  totalPages: number
}

const PaginationEllipsis: FunctionComponent<JssProps> = ({ classes }) => {
  return (
    <Container className={classes.ellipsis}>
      <Typography size='small' weight='semibold' color='black'>
        {ELLIPSIS}
      </Typography>
    </Container>
  )
}

const PaginationPage: FunctionComponent<
  {
    activePage: number
    disabled?: boolean
    page: number
    onClick: (page: NavigationType) => void
  } & JssProps
> = ({ page, activePage, disabled, classes, onClick }) => {
  return (
    <Button
      className={classes.rangeButton}
      disabled={disabled}
      onClick={() => onClick(page)}
      variant={activePage === page ? 'primary-blue' : 'secondary-blue'}
      size='small'
    >
      {page}
    </Button>
  )
}

export const Pagination: FunctionComponent<Props> = ({
  activePage,
  classes,
  disabled,
  totalPages,
  onPageChange
}) => {
  const isFirstActive = activePage === 1
  const isLastActive = activePage === totalPages

  if (totalPages <= ONE_PAGE) {
    return null
  }

  const handleChange = useCallback((navigation: NavigationType) => {
    if (navigation === 'first') {
      return onPageChange(FIRST_PAGE)
    }

    if (navigation === 'previous') {
      return onPageChange(activePage - ONE_PAGE)
    }

    if (navigation === 'next') {
      return onPageChange(activePage + ONE_PAGE)
    }

    if (navigation === 'last') {
      return onPageChange(totalPages)
    }

    return onPageChange(navigation)
  }, [])

  const pages = useMemo(() => getRange(activePage, totalPages, SIBLING_COUNT), [
    activePage,
    totalPages
  ])

  return (
    <Container flex inline alignItems='center'>
      <Button
        disabled={isFirstActive || disabled}
        onClick={() => handleChange('previous')}
        variant='secondary-blue'
        size='small'
      >
        Prev
      </Button>

      {pages.map((page, index) => {
        if (page === ELLIPSIS) {
          return <PaginationEllipsis classes={classes} />
        }

        return (
          <PaginationPage
            classes={classes}
            page={page as number}
            activePage={activePage}
            disabled={disabled}
            // eslint-disable-next-line react/no-array-index-key
            key={(page as string) + index}
            onClick={handleChange}
          />
        )
      })}

      <Button
        disabled={isLastActive || disabled}
        onClick={() => handleChange('next')}
        variant='secondary-blue'
        size='small'
      >
        Next
      </Button>
    </Container>
  )
}

Pagination.defaultProps = {
  disabled: false
}

Pagination.displayName = 'Pagination'

export default withStyles(styles)(Pagination)
