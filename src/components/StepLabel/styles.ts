import { createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiStepLabel: {
    label: {
      paddingLeft: '0.5em',
      fontSize: '0.6875em',
      fontWeight: 600,
      lineHeight: '1em',

      '&$active': {
        display: 'block'
      }
    },
    iconContainer: {
      paddingRight: 0
    }
  }
}))

export default () =>
  createStyles({
    hidden: {
      display: 'none'
    }
  })
