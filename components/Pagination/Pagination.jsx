import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FastRewind from '@material-ui/icons/FastRewind'
import FastForward from '@material-ui/icons/FastForward'

import styles from './styles'
import Button from '../Button'
import { getRange, MORE } from './range-utils'

const NAVIGATION = {
  FIRST: 'FIRST',
  LAST: 'LAST',
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT'
}
const FIRST_PAGE = 1
const ONE_PAGE = 1

const renderRange = (props) => {
  const {
    totalPages,
    activePage,
    siblingCount,
    EllipsisItem
  } = props

  const range = getRange({ activePage, totalPages, siblingCount })

  return range.map((pageNumber, index) => {
    return (
      <Button
        color={activePage === pageNumber ? 'primary' : undefined}
        disabled={pageNumber === MORE}
        key={pageNumber + index} // eslint-disable-line react/no-array-index-key
        onClick={() => handleChange(pageNumber, props)}
        variant={activePage === pageNumber ? 'contained' : 'outlined'}
      >
        {pageNumber === MORE && EllipsisItem}
        {pageNumber !== MORE && pageNumber}
      </Button>
    )
  })
}

const handleChange = (navigation, props) => {
  const { onPageChange, totalPages, activePage } = props
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

const isFirstActive = ({ activePage }) => activePage === 1
const isLastActive = ({ activePage, totalPages }) => activePage === totalPages

const Pagination = props => {
  const {
    FirstItem,
    LastItem,
    NextItem,
    PreviousItem
  } = props

  return (
    <Button.Group>
      <Button
        color='default'
        disabled={isFirstActive(props)}
        onClick={() => handleChange(NAVIGATION.FIRST, props)}
        variant='outlined'
      >
        {FirstItem}
      </Button>
      <Button
        color='default'
        disabled={isFirstActive(props)}
        onClick={() => handleChange(NAVIGATION.PREVIOUS, props)}
        variant='outlined'
      >
        {PreviousItem}
      </Button>

      {renderRange(props)}

      <Button
        color='default'
        disabled={isLastActive(props)}
        onClick={() => handleChange(NAVIGATION.NEXT, props)}
        variant='outlined'
      >
        {NextItem}
      </Button>
      <Button
        color='default'
        disabled={isLastActive(props)}
        onClick={() => handleChange(NAVIGATION.LAST, props)}
        variant='outlined'
      >
        {LastItem}
      </Button>
    </Button.Group>
  )
}

Pagination.propTypes = {
  EllipsisItem: PropTypes.node,
  FirstItem: PropTypes.node,
  LastItem: PropTypes.node,
  NextItem: PropTypes.node,
  PreviousItem: PropTypes.node,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  disabled: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired
}

Pagination.defaultProps = {
  EllipsisItem: '...',
  PreviousItem: <ChevronLeft />,
  NextItem: <ChevronRight />,
  FirstItem: <FastRewind />,
  LastItem: <FastForward />,
  disabled: false,
  siblingCount: 1
}

export default withStyles(styles)(Pagination)
