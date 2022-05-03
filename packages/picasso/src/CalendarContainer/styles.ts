import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, shadows }: Theme) =>
  createStyles({
    root: {
      padding: '1.875em',
      color: palette.grey.darker,
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '20.5rem',
      maxWidth: '20.5rem',
      boxShadow: shadows[2],
      backgroundColor: palette.common.white
    }
  })
