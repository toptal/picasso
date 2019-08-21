import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes: { input } }: Theme) =>
  createStyles({
    autocompleteWrapper: {
      '& > div': {
        display: 'flex',
        flexWrap: 'wrap',
        height: 'auto',
        marginRight: '-0.5em',
        marginBottom: '-0.5em'
      },
      '& > div > * ': {
        marginRight: '0.5em',
        marginBottom: '0.5em'
      },
      '& input': {
        width: 'auto',
        display: 'flex',
        height: '24px',
        paddingLeft: input.padding
      },
      '& div[role=button] span span ': {
        color: palette.primary.main
      }
    }
  })
