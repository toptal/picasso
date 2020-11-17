import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ sizes: { input, borderWidth }, palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: input.width
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    option: {
      paddingRight: '1rem',
      paddingLeft: '1rem'
    },
    otherOption: {
      borderTop: `${borderWidth} solid ${palette.grey.light2}`
    },
    stringContent: {
      fontSize: '0.8125em'
    }
  })
