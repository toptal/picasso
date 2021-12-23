import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const baseCellStyles = {
  fontSize: rem('12px'),
  borderBottom: 'none'
}

const regularCellStyles = {
  ...baseCellStyles,
  padding: '0.5rem 1rem',
  height: '2.5rem',

  '&:last-child': {
    paddingRight: '1.5rem'
  }
}

const compactCellStyles = {
  ...baseCellStyles,
  padding: `${rem('1px')} 0.5rem`,
  height: '1.5rem',

  '&:last-child': {
    paddingRight: '0.75rem'
  }
}

const narrowCellStyles = {
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem'
}

export default () =>
  createStyles({
    root: regularCellStyles,
    compact: compactCellStyles,
    narrow: narrowCellStyles
  })
