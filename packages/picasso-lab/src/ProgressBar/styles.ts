import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    progressBar: {
      width: '100%',
      height: '0.5em',
      background: palette.grey.light,
      borderRadius: '4px'
    },
    progressIndicator: {
      height: '0.5em',
      borderRadius: '4px',
      background: palette.blue.light,
      transition: 'width 0.3s ease-in-out'
    },
    percentageValue: {
      marginLeft: '0.5em'
    }
  })
