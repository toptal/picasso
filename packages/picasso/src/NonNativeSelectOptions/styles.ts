import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    menuGroup: {
      padding: '1rem 1rem 0.5rem'
    },
    fixedFooter: {
      padding: '0.75rem 1rem',
      borderTop: `${sizes.borderWidth} solid ${palette.grey.light}`
    }
  })
