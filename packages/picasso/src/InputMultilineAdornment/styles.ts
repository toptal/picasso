import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    multilineAdornment: {
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 1.25rem)',
      height: '1.25rem',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      margin: 0,
      padding: '0.25rem 0',
      borderTop: `1px solid ${palette.grey.lighter2}`
    }
  })
