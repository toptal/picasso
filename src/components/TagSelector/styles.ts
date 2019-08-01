import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ spacing: { input } }: Theme) =>
  createStyles({
    tag: {
      marginRight: input.padding
    },
    autocompleteWrapper: {
      '& > div': {
        flexWrap: 'wrap',
        height: 'auto'
      },
      '& input': {
        width: 'auto',
        display: 'flex',
        flex: 1
      }
    }
  })
