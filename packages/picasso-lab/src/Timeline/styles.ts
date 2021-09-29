import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    connector: {
      alignSelf: 'stretch',
      borderLeft: `${sizes.borderWidth} dashed ${palette.grey.light2}`,
      transform: 'translate3d(8.5px, 20px, 0)',
      height: 'calc(100% - 20px)'
    }
  })
