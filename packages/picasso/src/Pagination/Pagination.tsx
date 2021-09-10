import React, { forwardRef, useMemo, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import Button from '../Button'
import Container from '../Container'
import Typography from '../Typography'
import { getRange, ELLIPSIS } from './utils'
import styles from './styles'
import PaginationButton from '../PaginationButton'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPagination'
})

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Value of the current highlighted page */
  activePage: number
  /** Shows `Pagination` in disabled state when pages are not changeable */
  disabled?: boolean
  /** Callback invoked when any page number is clicked */
  onPageChange: (page: number) => void
  /** Value of total pages of the data set used for calculation of page buttons */
  totalPages: number
  /** Number of the active page siblings  */
  siblingCount?: number
  /** Variant of the pagination representation  */
  variant?: 'default' | 'compact'
}

export const Pagination = forwardRef<HTMLDivElement, Props>(
  function Pagination (props, ref) {
    const {
      activePage,
      disabled,
      totalPages,
      onPageChange,
      siblingCount = 2,
      variant,
      ...rest
    } = props
    const classes = useStyles()

    const pages = useMemo(
      () => getRange({ activePage, totalPages, siblingCount }),
      [activePage, totalPages, siblingCount]
    )

    if (pages.length <= 1) {
      return null
    }

    const isFirstActive = activePage === 1
    const isLastActive = activePage === totalPages

    const handlePrevClick = () => onPageChange(activePage - 1)
    const handleNextClick = () => onPageChange(activePage + 1)

    const pageButtons = pages.map((page, index) => {
      if (typeof page === 'string') {
        return (
          <Container
            key={`pagination-ellipsis${index}`}
            className={classes.ellipsis}
          >
            <Typography size='small' weight='semibold' color='black'>
              {ELLIPSIS}
            </Typography>
          </Container>
        )
      }

      return (
        <PaginationButton
          key={`${page}${index}`}
          className={classes.button}
          page={page}
          activePage={activePage}
          disabled={disabled}
          onClick={onPageChange}
        />
      )
    })

    return (
      <Container {...rest} ref={ref} flex inline alignItems='center'>
        <Button
          className={classes.button}
          disabled={isFirstActive || disabled}
          onClick={handlePrevClick}
          variant='secondary'
          size='small'
        >
          Prev
        </Button>

        {variant === 'compact' ? null : pageButtons}

        <Button
          className={classes.button}
          disabled={isLastActive || disabled}
          onClick={handleNextClick}
          variant='secondary'
          size='small'
        >
          Next
        </Button>
      </Container>
    )
  }
)

Pagination.defaultProps = {
  disabled: false,
  siblingCount: 2,
  variant: 'default'
}

Pagination.displayName = 'Pagination'

export default Pagination
