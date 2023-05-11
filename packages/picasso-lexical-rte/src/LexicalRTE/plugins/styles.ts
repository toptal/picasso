import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      border: `1px solid ${palette.grey[100]}`,
      borderRadius: sizes.borderRadius.medium,
      padding: '4px 8px',
      '&:hover, &:focus': {
        borderColor: palette.grey[200],
      },
    },
    'button-focus': {
      borderColor: `1px solid ${palette.primary.dark}`,
      fontWeight: 'bold',
    },
  })
