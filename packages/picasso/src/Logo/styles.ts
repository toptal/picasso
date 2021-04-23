import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1.875rem',
      verticalAlign: 'baseline'
    },
    rootEmblem: {
      fontSize: '1.875rem',
      verticalAlign: 'baseline'
    },
    default: {
      color: palette.blue.main,
      '--logo-text-color': palette.text.primary,
      '--logo-emblem-color': palette.blue.main
    },
    blue: {
      // deprecated backward-compatible variant with default
      color: palette.blue.main,
      '--logo-text-color': palette.common.black,
      '--logo-emblem-color': palette.blue.main
    },
    white: {
      color: palette.common.white,
      '--logo-text-color': palette.common.white,
      '--logo-emblem-color': palette.common.white
    },
    black: {
      color: palette.common.black,
      '--logo-text-color': palette.common.black,
      '--logo-emblem-color': palette.common.black
    },
    grey: {
      color: palette.grey.darker,
      '--logo-text-color': palette.grey.darker,
      '--logo-emblem-color': palette.grey.darker
    }
  })
