import React, { PureComponent } from 'react'

import Button from '../Button'
import { BaseProps } from '../Picasso'
import { getRange, ELLIPSIS, FIRST_PAGE, ONE_PAGE } from './range-utils'

type NavigationType = 'first' | 'last' | 'previous' | 'next'

const SIBLING_COUNT = 3

interface Props extends BaseProps {
  /** Value of the current highlighted page */
  activePage: number
  /** Shows `Pagination` in disabled state when pages are not changeable */
  disabled?: boolean
  /** Callback invoked when any page number is clicked */
  onPageChange: (page: number) => void
  /** Value of total pages of the data set used for calculation of page buttons */
  totalPages: number
}

export class Pagination extends PureComponent<Props> {
  static defaultProps = {
    disabled: false
  }

  handleChange(navigation: NavigationType) {
    const { onPageChange, totalPages, activePage } = this.props
    let page

    switch (navigation) {
      case 'first':
        page = FIRST_PAGE
        break
      case 'previous':
        page = activePage - ONE_PAGE
        break
      case 'next':
        page = activePage + ONE_PAGE
        break
      case 'last':
        page = totalPages
        break
      default:
        page = navigation
    }

    onPageChange(page)
  }

  isFirstActive = () => {
    const { activePage } = this.props

    return activePage === 1
  }

  isLastActive = () => {
    const { activePage, totalPages } = this.props

    return activePage === totalPages
  }

  renderRange() {
    const { totalPages, activePage, disabled } = this.props

    const range = getRange(activePage, totalPages, SIBLING_COUNT)

    return range.map((pageItemLabel, index) => {
      return (
        <Button
          disabled={pageItemLabel === ELLIPSIS || disabled}
          key={(pageItemLabel as string) + index} // eslint-disable-line react/no-array-index-key
          onClick={() => this.handleChange(pageItemLabel as NavigationType)}
          variant={activePage === pageItemLabel ? 'primary' : 'basic'}
        >
          {pageItemLabel}
        </Button>
      )
    })
  }

  render() {
    const { disabled } = this.props
    const isFirstActive = this.isFirstActive()
    const isLastActive = this.isLastActive()

    return (
      <Button.Group>
        <Button
          disabled={isFirstActive || disabled}
          onClick={() => this.handleChange('first')}
          variant='basic'
        >
          «
        </Button>
        <Button
          disabled={isFirstActive || disabled}
          onClick={() => this.handleChange('previous')}
          variant='basic'
        >
          ⟨
        </Button>

        {this.renderRange()}

        <Button
          disabled={isLastActive || disabled}
          onClick={() => this.handleChange('next')}
          variant='basic'
        >
          ⟩
        </Button>
        <Button
          disabled={isLastActive || disabled}
          onClick={() => this.handleChange('last')}
          variant='basic'
        >
          »
        </Button>
      </Button.Group>
    )
  }
}

export default Pagination
