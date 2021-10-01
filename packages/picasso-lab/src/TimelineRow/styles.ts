import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      // No bottom spacing for the last Container
      '&:last-child $content': {
        marginBottom: 0
      }
    },
    content: {},
    icon: {
      margin: '4px 0'
    },
    dot: {
      // Outer dot icon dimensions should match picasso 16px icons
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',

      '&:after': {
        content: '""',
        width: '9px',
        height: '9px',
        background: palette.grey.main2,
        borderRadius: '50%',
        lineHeight: '20px'
      }
    },
    date: {
      flex: '0 0 auto',

      // Move down date to align to the center of the dot/icon
      transform: 'translateY(4px)',
      '$hasIcon + &': {
        transform: 'translateY(2px)'
      }
    },
    separator: {
      // Move down dot separator to align to the line height of the content
      transform: 'translateY(7.5px)',
      '&$hasIcon': {
        transform: 'unset'
      }
    },
    hasIcon: {},
    connector: {
      flex: 1,
      width: '0',
      borderLeft: `1px dashed ${palette.grey.main!}`
    }
  })
