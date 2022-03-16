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
    static: {
      position: 'unset',
      transform: 'unset'
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
      padding: '1px 4px',
      ...getSizeProps(rem('12px'))
    },
    medium: {
      padding: '2px 6px',
      ...getSizeProps(rem('16px'))
    },
    large: {
      padding: '4px 8px',
      ...getSizeProps(rem('20px'))
    }
  })
