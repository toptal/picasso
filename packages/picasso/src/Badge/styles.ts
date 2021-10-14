import { rem } from '@toptal/picasso-shared'
import { Theme, createStyles } from '@material-ui/core/styles'

const getSizeProps = (unitInRem: string) => ({
  borderRadius: unitInRem,
  height: unitInRem,
  lineHeight: unitInRem,
  minWidth: unitInRem
})

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderStyle: 'solid',
      borderWidth: '1px',
      display: 'inline-flex',
      fontSize: rem('10px'),
      fontWeight: 600,
      alignItems: 'center',
      justifyContent: 'center'
    },
    // variants
    white: {
      background: palette.common.white,
      borderColor: palette.grey.light,
      color: palette.grey.dark
    },
    red: {
      backgroundColor: palette.red.main,
      borderColor: palette.red.main,
      color: palette.common.white
    },
    // sizes
    large: {
      padding: '0 3px',
      ...getSizeProps('1.25rem')
    },
    small: {
      padding: '0 2px',
      ...getSizeProps('0.75rem')
    },
    medium: {
      padding: '0 1px',
      ...getSizeProps('1rem')
    }
  })
