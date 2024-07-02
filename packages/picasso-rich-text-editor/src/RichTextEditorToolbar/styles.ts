import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      borderBottom: `1px solid ${palette.grey.light2}`,
      paddingBottom: '0.5em',
    },
    group: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      pointerEvents: 'unset',

      '&:not(:last-child):not(:empty)::after': {
        content: '""',
        height: '1em',
        width: '1px',
        position: 'relative',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        backgroundColor: palette.grey.lighter2,
      },
    },
    select: {
      // XXX: Using important to override Tailwind styles, remove when migrating RTE to Tailwind
      width: '7.125em !important',
    },

    groupDisabled: {
      pointerEvents: 'none',
    },
  })
