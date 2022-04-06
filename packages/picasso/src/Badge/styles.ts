import { rem } from '@toptal/picasso-shared'
import { Theme, createStyles, StyleRules } from '@material-ui/core/styles'

const getSizeProps = (unitInRem: string): StyleRules[keyof {}] => ({
  borderRadius: unitInRem,
  height: unitInRem,
  minWidth: unitInRem
})

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderWidth: '1px',
      borderStyle: 'solid',
      fontSize: rem('10px'),
      lineHeight: rem('12px'),
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
      lineHeight: rem('10px'),
      padding: `${rem('1px')} ${rem('4px')}`,
      ...getSizeProps(rem('12px'))
    },
    medium: {
      padding: `${rem('2px')} ${rem('6px')}`,
      ...getSizeProps(rem('16px'))
    },
    large: {
      padding: `${rem('4px')} ${rem('8px')}`,
      ...getSizeProps(rem('20px'))
    }
  })
