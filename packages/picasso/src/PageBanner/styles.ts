import { createStyles, Theme } from '@material-ui/core/styles'
import { spacingToRem } from '@toptal/picasso-shared'

const lineHeight = '1.25rem'

export default ({ layout, palette, typography, screens }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      justifyContent: 'center',
      '& + & > $content': {
        paddingTop: 0
      }
    },
    content: {
      color: palette.common.black,
      lineHeight,
      fontSize: '0.8125rem',
      width: '100%',
      padding: `${spacingToRem('medium')} ${layout.contentPaddingHorizontal}`,

      maxWidth: layout.contentWidth
    },
    actions: {
      fontWeight: typography.fontWeights.semibold
    },
    main: {
      '& > * + *': {
        marginTop: spacingToRem('xsmall')
      }
    },
    iconWrapper: {
      alignItems: 'center',
      height: lineHeight,
      marginRight: '1rem',
      [screens('small', 'medium')]: {
        marginRight: '0.5rem'
      }
    },
    wide: {
      maxWidth: layout.contentWidthWide
    },
    fullWidth: {
      maxWidth: '100%'
    }
  })
