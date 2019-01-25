import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import Button from '../Button'
import { getRange, ELLIPSIS, FIRST_PAGE, ONE_PAGE } from './range-utils'

const NAVIGATION = {
  FIRST: 'FIRST',
  LAST: 'LAST',
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT'
}
const SIBLING_COUNT = 3

class Pagination extends React.PureComponent {
  static propTypes = {
    activePage: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onPageChange: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired
  }

  static defaultProps = {
    disabled: false
  }

  handleChange (navigation) {
    const { onPageChange, totalPages, activePage } = this.props
    let page

    switch (navigation) {
      case NAVIGATION.FIRST:
        page = FIRST_PAGE
        break
      case NAVIGATION.PREVIOUS:
        page = activePage - ONE_PAGE
        break
      case NAVIGATION.NEXT:
        page = activePage + ONE_PAGE
        break
      case NAVIGATION.LAST:
        page = totalPages
        break
      default:
        page = navigation
    }

    onPageChange(page)
  }

  isFirstActive = activePage => activePage === 1
  isLastActive = (activePage, totalPages) => activePage === totalPages

  renderRange () {
    const { totalPages, activePage, disabled } = this.props

    const range = getRange({
      activePage,
      totalPages,
      siblingCount: SIBLING_COUNT
    })

    return range.map((pageItemLabel, index) => {
      return (
        <Button
          color={activePage === pageItemLabel ? 'primary' : undefined}
          disabled={pageItemLabel === ELLIPSIS || disabled}
          key={pageItemLabel + index} // eslint-disable-line react/no-array-index-key
          onClick={() => this.handleChange(pageItemLabel)}
          variant={activePage === pageItemLabel ? 'contained' : 'outlined'}
        >
          {pageItemLabel}
        </Button>
      )
    })
  }

  render () {
    const { activePage, totalPages, disabled } = this.props
    const isFirstActive = this.isFirstActive(activePage)
    const isLastActive = this.isLastActive(activePage, totalPages)

    return (
      <Button.Group>
        <Button
          color='default'
          disabled={isFirstActive || disabled}
          onClick={() => this.handleChange(NAVIGATION.FIRST)}
          variant='outlined'
        >
          «
        </Button>
        <Button
          color='default'
          disabled={isFirstActive || disabled}
          onClick={() => this.handleChange(NAVIGATION.PREVIOUS)}
          variant='outlined'
        >
          ⟨
        </Button>

        {this.renderRange()}

        <Button
          color='default'
          disabled={isLastActive || disabled}
          onClick={() => this.handleChange(NAVIGATION.NEXT)}
          variant='outlined'
        >
          ⟩
        </Button>
        <Button
          color='default'
          disabled={isLastActive || disabled}
          onClick={() => this.handleChange(NAVIGATION.LAST)}
          variant='outlined'
        >
          »
        </Button>
      </Button.Group>
    )
  }
}

export default withStyles(styles)(Pagination)
