import { createStyles, Theme } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

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
      margin: '4px 0',
      color: palette.grey.main2
    },
    dot: {
      // Outer dot icon dimensions should match picasso 16px icons
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      margin: '4px 0',

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
      flex: '0 0 auto'
    },
    dateText: {
      lineHeight: rem('24px')
    },
    connector: {
      flex: 1,
      width: '0',
      borderLeft: `1px dashed ${palette.grey.main2}`
    }
  })
