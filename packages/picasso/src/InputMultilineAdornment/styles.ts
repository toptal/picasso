import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) => {
  const bottomBarSpacingPx = 8
  const bottomBarSpacingLargePx = 12

  return createStyles({
    multilineAdornment: {
      // we cover the input when resizing, but keep the resize handle visible
      background:
        'linear-gradient(90deg, white 0%, white calc(100% - 20px), transparent calc(100% - 19px))',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '1.75rem',
      justifyContent: 'space-between',
      margin: 0,
      padding: `0.75rem ${bottomBarSpacingPx}px 0.25rem`,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: bottomBarSpacingPx,
        left: `${bottomBarSpacingPx}px`,
        width: `calc(100% - ${bottomBarSpacingPx * 2}px)`,
        borderTop: `1px solid ${palette.grey.lighter2}`,
      },

      '&$large': {
        padding: `1rem ${bottomBarSpacingLargePx}px 0.25rem`,
        height: '2.25rem',
        maxHeight: '2.25rem',
        '&::after': {
          top: bottomBarSpacingLargePx,
          left: `${bottomBarSpacingLargePx}px`,
          width: `calc(100% - ${bottomBarSpacingLargePx * 2}px)`,
        },
      },
    },
    large: {},
  })
}
