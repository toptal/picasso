import { Theme, createStyles } from '@material-ui/core/styles'

import { rem } from '../../styles'

export default ({ palette }: Theme) =>
  createStyles({
    track: {
      backgroundColor: palette.grey.main,
      height: rem('1px')
    },
    thumb: {
      border: `${rem('2px')} solid ${palette.common.white}`,
      height: rem('13px'),
      width: rem('13px'),
      '&:hover': {
        boxShadow: 'none'
      }
    },
    activated: {
      '& $thumb': {
        boxShadow: 'none'
      }
    }
  })
