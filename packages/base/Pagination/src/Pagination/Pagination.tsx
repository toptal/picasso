/* eslint-disable react/no-array-index-key */
import type { HTMLAttributes } from 'react'
import React, { forwardRef, useMemo } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

import { getRange, ELLIPSIS } from './utils'
import { PaginationButton } from '../PaginationButton'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Value of the current highlighted page */
  activePage: number
  /** Shows `Pagination` in disabled state when pages are not changeable */
  disabled?: boolean
  /** Callback invoked when any page number is clicked */
  onPageChange: (page: number) => void
  /** Value of total pages of the data set used for calculation of page buttons.
   *  When not provided:
   *  - An error will be raised unless `variant=compact`
   *  - Last page can't be detected, so next button will always be enabled.
   *    Use `nextDisabled=true` to disable it when rendering the last page.
   * */
  totalPages?: number
  /** Number of the active page siblings  */
  siblingCount?: number
  /** Variant of the pagination representation  */
  variant?: 'default' | 'compact'
  /** Shows the next button as disabled. */
  nextDisabled?: boolean
}

export const Pagination = forwardRef<HTMLDivElement, Props>(function Pagination(
  props,
  ref
) {
  const {
    activePage,
    disabled,
    totalPages,
    onPageChange,
    siblingCount = 2,
    variant,
    nextDisabled,
    ...rest
  } = props

  if (totalPages == null && variant !== 'compact') {
    throw new Error('Pagination requires totalPages for non compact variants')
  }

  const pages = useMemo(
    () =>
      totalPages != null
        ? getRange({ activePage, totalPages, siblingCount })
        : [],
    [activePage, totalPages, siblingCount]
  )

  if (totalPages != null && totalPages <= 1) {
    return null
  }

  const isFirstActive = activePage === 1
  const isLastActive = activePage === totalPages

  const handlePrevClick = () => onPageChange(activePage - 1)
  const handleNextClick = () => onPageChange(activePage + 1)

  const pageButtons = pages.map((page, index) => {
    if (page === ELLIPSIS) {
      return (
        <Container key={index} className='py-0 px-[0.5em] cursor-default'>
          <Typography size='xsmall' weight='semibold' color='black'>
            {ELLIPSIS}
          </Typography>
        </Container>
      )
    }

    return (
      <PaginationButton
        key={index}
        className='[&+&]:!ml-2'
        page={Number(page)}
        activePage={activePage}
        disabled={disabled}
        onClick={onPageChange}
      />
    )
  })

  return (
    <Container {...rest} ref={ref} flex inline alignItems='center'>
      <Button
        className='[&+&]:!ml-2'
        disabled={isFirstActive || disabled}
        onClick={handlePrevClick}
        variant='secondary'
        size='small'
      >
        Prev
      </Button>

      {variant === 'compact' ? null : pageButtons}

      <Button
        className='[&+&]:!ml-2'
        disabled={isLastActive || disabled || nextDisabled}
        onClick={handleNextClick}
        variant='secondary'
        size='small'
      >
        Next
      </Button>
    </Container>
  )
})

Pagination.defaultProps = {
  disabled: false,
  siblingCount: 2,
  variant: 'default',
}

Pagination.displayName = 'Pagination'

export default Pagination
