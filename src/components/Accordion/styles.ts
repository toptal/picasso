import { Theme } from '@material-ui/core/styles'

import { createPropertiesStyles } from '../styles'

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

  return {
    root: {
      '&:first-child:before, &:before': {
        ...separatorStyles
      },
      '&$expanded + &:before': {
        display: 'block'
      },
      '&:after': {
        ...separatorStyles
      }
    },
    expanded: {
      margin: 0
    },
    summary: {
      color: palette.common.black
    },
    expandIcon: {
      fontSize: '0.7em',
      color: palette.primary.main
    },
    details: {
      padding: 0,
      lineHeight: '1.5em',
      color: palette.grey.darker,
      fontSize: '0.875em',
      fontWeight: typography.fontWeights.regular,
      marginBottom: '0.75em'
    }
  }
}
