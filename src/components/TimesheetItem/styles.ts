import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    timesheet: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '3rem',
      minWidth: '37rem'
    },
    timesheetInfo: {
      paddingRight: '1rem'
    },
    timesheetInfoLink: {
      borderBottom: `1px dotted ${palette.grey[200]}`
    },
    overdueMessage: {
      color: palette.error.main
    },
    controls: {
      flexShrink: 0
    }
  })
