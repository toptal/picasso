import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '../Button'
import Container from '../Container'
import Typography from '../Typography'
import { StandardProps } from '../Picasso'
import { getRange, ELLIPSIS, FIRST_PAGE, ONE_PAGE } from './range-utils'
import styles from './styles'

type NavigationType = 'first' | 'last' | 'previous' | 'next'

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
    const { totalPages, activePage, disabled, classes } = this.props

    const range = getRange(activePage, totalPages, SIBLING_COUNT)

    return range.map((pageItemLabel, index) => {
      if (pageItemLabel === ELLIPSIS) {
        return (
          <Container className={classes.ellipsis}>
            <Typography size='small' weight='semibold' color='black'>
              {pageItemLabel}
            </Typography>
          </Container>
        )
      }

      return (
        <Button
          className={classes.rangeButton}
          disabled={disabled}
          key={(pageItemLabel as string) + index} // eslint-disable-line react/no-array-index-key
          onClick={() => this.handleChange(pageItemLabel as NavigationType)}
          variant={
            activePage === pageItemLabel ? 'primary-blue' : 'secondary-blue'
          }
          size='small'
        >
          {pageItemLabel}
        </Button>
      )
    })
  }

  render() {
    const { disabled, totalPages } = this.props
    const isFirstActive = this.isFirstActive()
    const isLastActive = this.isLastActive()

    if (totalPages <= ONE_PAGE) {
      return null
    }

    return (
      <Container flex inline alignItems='center'>
        <Button
          disabled={isFirstActive || disabled}
          onClick={() => this.handleChange('previous')}
          variant='secondary-blue'
          size='small'
        >
          Prev
        </Button>

        {this.renderRange()}

        <Button
          disabled={isLastActive || disabled}
          onClick={() => this.handleChange('next')}
          variant='secondary-blue'
          size='small'
        >
          Next
        </Button>
      </Container>
    )
  }
}

export default withStyles(styles)(Pagination)
