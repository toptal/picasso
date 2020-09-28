import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, createPropertiesStyles } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiAccordion: {
    root: {
      '&:before': {
        display: 'none'
      },
      '&$expanded': {
        margin: 0
      },
      '&$disabled': {
        backgroundColor: 'unset'
      }
    }
  }
}))

export default ({ palette, typography }: Theme) => {
  const separatorStyles = createPropertiesStyles({
    display: 'block',
    left: 0,
    right: 0,
    height: '1px',
    content: '""',
    opacity: 1,
    backgroundColor: palette.grey.light2,
    position: 'absolute'
  })

  return createStyles({
    root: {
      background: 'transparent',
      fontSize: '1rem',

      '&:before': {
        display: 'none'
      }
    },
    bordered: {
      '&:first-child:before': {
        ...separatorStyles
      },
      '&:before': {
        background: 'transparent'
      },
      '&:after': {
        ...separatorStyles
      },
      '&:nth-child(1):nth-last-child(1)': {
        '&:before, &:after': {
          display: 'none'
        }
      }
    },

    summaryFontWeightInherit: createPropertiesStyles({
      fontWeight: 'inherit'
    }),
    expandIcon: {
      fontSize: '0.7em',
      color: palette.grey.dark,
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    expandIconExpanded: {
      transform: 'rotate(180deg)'
    },
    expandIconAlignTop: {
      display: 'flex',
      alignItems: 'center',
      height: '1.5em',
      alignSelf: 'flex-start'
    },
    summary: {
      color: palette.common.black
    },
    details: {
      padding: 0
    },
    summaryWrapper: {
      color: palette.common.black
    },
    detailsWrapper: {
      lineHeight: '1.5em',
      color: palette.grey.darker,
      fontSize: '0.875em',
      fontWeight: typography.fontWeights.regular,
      marginBottom: '0.75em'
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      lineHeight: '1.5em'
    }
  })
}
