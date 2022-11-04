import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) => {
  const bottomBarSpacingPx = 9

  return createStyles({
    multilineAdornment: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '1.25rem',
      justifyContent: 'space-between',
      margin: 0,
      padding: `0.25rem ${bottomBarSpacingPx}px`,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: `${bottomBarSpacingPx}px`,
        width: `calc(100% - ${bottomBarSpacingPx * 2}px)`,
        borderTop: `1px solid ${palette.grey.lighter2}`,
      },
    },
  })
}
