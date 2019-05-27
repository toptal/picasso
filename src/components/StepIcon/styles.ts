import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiStepIcon: {
    text: {
      display: 'none'
    },
    root: {
      border: `1px solid ${palette.grey[200]}`,
      borderRadius: '50%',
      color: 'transparent',

      '&$completed': {
        border: 'none',
        color: palette.green.main
      },

      '&$active': {
        border: 'none'
      }
    }
  }
}))

export default () => createStyles({})
