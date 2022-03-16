import { rem } from '@toptal/picasso-shared'
import { Theme, createStyles } from '@material-ui/core/styles'

const getSizeProps = (unitInRem: string) => ({
  borderRadius: unitInRem,
  height: unitInRem,
  minWidth: unitInRem
})

export default ({ palette }: Theme) =>
  createStyles({
    // variants
    root: {
      borderWidth: '1px',
      borderStyle: 'solid',
      fontSize: rem('10px'),
      fontWeight: 600
    },
    white: {
      background: palette.common.white,
      color: palette.grey.dark,
      borderColor: palette.grey.light2
    },
    red: {
      color: palette.common.white,
      borderColor: palette.red.main,
      backgroundColor: palette.red.main
    },
    small: {
      padding: '4px 1px',
      ...getSizeProps(rem('12px'))
    },
    medium: {
      padding: '6px 2px',
      ...getSizeProps(rem('16px'))
    },
    large: {
      padding: '8px 4px',
      ...getSizeProps(rem('20px'))
    }
  })
