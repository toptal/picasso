import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ spacing: { input } }: Theme) =>
  createStyles({
    root: {
      position: 'relative'
    },
    rootFixedWidth: {
      width: input.width
    },
    rootFullWidth: {
      width: '100%'
    }
  })
