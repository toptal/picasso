import { Theme, createStyles } from '@material-ui/core/styles'

import { createPropertiesStyles, rem } from '../styles'
import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiExpansionPanel: {
    root: {
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
    backgroundColor: palette.grey.light,
    position: 'absolute'
  })

  return createStyles({
    root: {
      background: 'transparent',

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
    summary: {
      color: palette.common.black
    },
    summaryFontWeightInherit: createPropertiesStyles({
      fontWeight: 'inherit'
    }),
    expandIcon: {
      fontSize: '0.7em',
      color: palette.primary.main,
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    expandIconExpanded: {
      transform: 'rotate(180deg)'
    },
    expandIconAlignTop: {
      display: 'flex',
      alignItems: 'center',
      height: rem('24px'),
      alignSelf: 'flex-start',
      // to keep the same size of the icon
      fontSize: '1.7142857142857142rem'
    },
    details: {
      padding: 0,
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
      justifyContent: 'space-between'
    }
  })
}
