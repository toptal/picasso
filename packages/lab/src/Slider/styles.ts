import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, rem } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiSlider: {
    thumb: {
      '&:hover, &$active, &$focusVisible': {
        boxShadow: 'none'
      }
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      display: 'block',
      color: palette.grey.main,
      margin: `${rem('6px')} 0`,
      padding: 0,
      height: rem('1px')
    },
    rail: {
      height: rem('1px'),
      borderRadius: 'unset',
      opacity: 0.24
    },
    track: {
      backgroundColor: palette.grey.main,
      borderRadius: 'unset',
      height: rem('1px')
    },
    thumb: {
      backgroundColor: palette.primary.main,
      border: `${rem('2px')} solid ${palette.common.white}`,
      height: rem('13px'),
      width: rem('13px'),
      marginTop: rem('-6px')
    }
  })
