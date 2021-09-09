import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      borderRadius: sizes.borderRadius.medium,
      padding: '1rem 0',
      border: `${sizes.borderWidth} solid ${palette.grey.light2}`,
      backgroundColor: palette.common.white,
      justifyContent: 'flex-start',
      '& > *': {
        flex: '1 0'
      },
      '&:not(:first-child)': {
        borderTop: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      },
      '&:not(:last-child)': {
        borderBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBottom: 0
      }
    }
  })
