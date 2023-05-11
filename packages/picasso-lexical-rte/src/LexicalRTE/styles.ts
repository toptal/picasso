import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes, typography }: Theme) =>
  createStyles({
    wrapper: {
      margin: '20px',
    },
    content: {
      border: `1px solid ${palette.grey[100]}`,
      borderRadius: sizes.borderRadius.medium,
      marginTop: '4px',
      padding: '8px',
      minHeight: '150px',
      outlineWidth: 0,
      '&:hover, &:focus': {
        borderColor: palette.grey[200],
      },
    },
    heading: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.semibold,
    },
    'heading-xlarge': {
      ...typography.headings.xlarge,
    },
    'heading-large': {
      ...typography.headings.large,
    },
    'heading-medium': {
      ...typography.headings.medium,
    },
    'heading-small': {
      ...typography.headings.small,
    },
    'editor-underline': {
      textDecoration: 'underline',
    },

    'editor-italic': {
      fontStyle: 'italic',
    },
    'editor-bold': {
      fontWeight: typography.fontWeights.semibold,
    },
  })
