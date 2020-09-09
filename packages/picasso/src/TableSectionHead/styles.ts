import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ typography }: Theme) =>
  createStyles({
    iconWrapper: {
      marginRight: '0.75rem',
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    sectionHeaderRow: {
      minHeight: '2.5rem',
      fontWeight: typography.fontWeights.semibold
    }
  })
