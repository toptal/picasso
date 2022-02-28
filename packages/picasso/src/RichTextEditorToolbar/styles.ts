import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      borderBottom: `1px solid ${palette.grey.light2}`,
      paddingBottom: '0.5em'
    },
    group: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      pointerEvents: ({ disabled }: { disabled: boolean }) =>
        disabled ? 'none' : 'unset',

      '&:not(:last-child)::after': {
        content: '""',
        height: '1em',
        width: '1px',
        position: 'relative',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        backgroundColor: palette.grey.lighter2
      }
    },
    select: {
      width: '7.125em'
    }
  })
