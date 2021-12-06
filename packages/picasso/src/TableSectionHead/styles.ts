import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    iconWrapper: {
      marginRight: '0.75rem',
      marginTop: '-0.0625rem',
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    sectionHeaderRow: {
      minHeight: '2.5rem',
      borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter2}`,
      borderTop: `${sizes.borderWidth} solid ${palette.grey.lighter2}`
    }
  })
