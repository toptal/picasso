import { alpha } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hoverColor = alpha(palette.grey.darker!, 0.7)

  return createStyles({
    editContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: hoverColor,
      zIndex: 1,
      color: palette.common.white,
      cursor: 'pointer',
    },
  })
}
