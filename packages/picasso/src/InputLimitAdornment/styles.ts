import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    limiterLabel: {
      color: palette.grey.main2,
      fontSize: '0.625rem',
      lineHeight: '1rem'
    },
    limiterLabelError: {
      color: palette.red.main
    },
    limiterMultiline: {
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 1.25rem)',
      height: '1.25rem',
      justifyContent: 'flex-start',
      margin: 0,
      padding: '0.25rem 0',
      borderTop: `1px solid ${palette.grey.lighter2}`
    }
  })
