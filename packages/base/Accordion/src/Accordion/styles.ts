import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiAccordion: {
    root: {
      '&$expanded': {
        margin: 0,
        '&:before': {
          opacity: 1,
        },
      },
      '&$disabled': {
        backgroundColor: 'unset',
      },
    },
  },
}))

export default ({ palette, typography }: Theme) => {
  const separatorStyles = {
    display: 'block',
    left: 0,
    right: 0,
    height: '1px',
    content: '""',
    opacity: 1,
    backgroundColor: palette.grey.light2,
    position: 'absolute',
  }

  return createStyles({
    root: {
      background: 'transparent',
      fontSize: '1rem',
    },
    bordersAll: {
      '&:before, &:after': {
        ...separatorStyles,
      },
      '&:first-child:before': {
        display: 'block',
      },
      '& + $root:before': {
        display: 'none',
      },
    },
    bordersMiddle: {
      '&:before': {
        display: 'none',
      },
      '&$root + $root:before': {
        ...separatorStyles,
        display: 'block',
        transform: 'translateY(1px)',
      },
    },
    bordersNone: {
      '&:before, &:after': {
        display: 'none',
      },
    },
    summaryFontWeightInherit: {
      fontWeight: 'inherit',
    },
    expandIcon: {
      fontSize: '0.7em',
      color: palette.grey.dark,
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    expandIconExpanded: {
      transform: 'rotate(180deg)',
    },
    expandIconAlignTop: {
      display: 'flex',
      alignItems: 'center',
      height: '1.5em',
      alignSelf: 'flex-start',
    },
    expandIconLeft: {
      marginRight: '0.5em',
    },
    summary: {
      color: palette.common.black,
    },
    details: {
      padding: 0,
    },
    summaryWrapper: {
      color: palette.common.black,
    },
    detailsWrapper: {
      lineHeight: '1.5em',
      color: palette.grey.darker,
      fontSize: '0.875em',
      fontWeight: typography.fontWeights.regular,
      marginBottom: '0.75em',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      lineHeight: '1.5em',
    },
    contentRight: {
      justifyContent: 'normal',
    },
  })
}
