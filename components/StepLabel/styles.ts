import { createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiStepLabel: {
    label: {
      display: 'none',

      '&$active': {
        display: 'block',
        paddingLeft: '0.5em',
        fontSize: '0.6875em',
        fontWeight: 600,
        lineHeight: '1em'
      }
    },
    iconContainer: {
      paddingRight: 0
    }
  }
}))

export default () => createStyles({})
