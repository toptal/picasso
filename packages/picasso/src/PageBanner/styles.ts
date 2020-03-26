import { createStyles, Theme } from '@material-ui/core/styles'
import { spacingToRem, rem } from '@toptal/picasso-shared'

export default ({ layout, palette, typography }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      justifyContent: 'center',
      '&:first-of-type > $content': {
        paddingTop: spacingToRem('medium')
      }
    },
    content: {
      color: palette.common.black,
      lineHeight: '1.25rem',
      fontSize: '0.8125rem',
      width: '100%',
      paddingLeft: layout.contentPaddingHorizontal,
      paddingRight: layout.contentPaddingHorizontal,
      paddingBottom: spacingToRem('medium'),
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
      marginTop: rem('2px'),
      alignItems: 'flex-start',
      marginRight: '1rem'
    },
    wide: {
      maxWidth: layout.contentWidthWide
    },
    fullWidth: {
      maxWidth: '100%'
    }
  })
