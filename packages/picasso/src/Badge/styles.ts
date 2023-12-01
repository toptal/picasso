/* eslint-disable import/no-extraneous-dependencies */
import { rem } from '@toptal/picasso-shared'
import type { Theme, StyleRules } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

const getSizeProps = (unitInRem: string): StyleRules[keyof {}] => ({
  borderRadius: unitInRem,
  height: unitInRem,
  minWidth: unitInRem,
})

export default ({ palette, typography }: Theme) =>
  createStyles({
    root: {
      borderWidth: '1px',
      borderStyle: 'solid',
      fontSize: rem('10px'),
      lineHeight: rem('12px'),
      padding: '0 1px',
      fontWeight: typography.fontWeights.semibold,
    },
    static: {
      position: 'unset',
      transform: 'unset',
    },
    white: {
      background: palette.common.white,
      color: palette.grey.dark,
      borderColor: palette.grey.light2,
    },
    red: {
      color: palette.common.white,
      borderColor: palette.red.main,
      backgroundColor: palette.red.main,
    },
    small: {
      lineHeight: rem('10px'),
      ...getSizeProps(rem('12px')),
    },
    medium: {
      ...getSizeProps(rem('16px')),
    },
    large: {
      padding: '0 3px',
      ...getSizeProps(rem('20px')),
    },
  })
