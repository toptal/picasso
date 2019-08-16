import { Theme, createStyles } from '@material-ui/core/styles'

import { rem } from '../../styles'
import { PicassoProvider } from '../../Picasso'

PicassoProvider.override(() => ({
  MuiSlider: {
    thumb: {
      '&$active': {
        boxShadow: 'none'
      }
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey.main
    },
    rail: {
      height: rem('1px'),
      opacity: 0.24
    },
    track: {
      backgroundColor: palette.grey.main,
      height: rem('1px')
    },
    thumb: {
      backgroundColor: palette.primary.main,
      border: `${rem('2px')} solid ${palette.common.white}`,
      height: rem('13px'),
      width: rem('13px'),
      marginTop: rem('-6px'),
      '&:hover': {
        boxShadow: 'none'
      }
    }
  })
