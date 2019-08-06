import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '3em',
      padding: '0 1.5em',

      '&:hover': {
        color: palette.blue.main,
        backgroundColor: 'initial',

        '&$selected': {
          backgroundColor: palette.blue.lighter
        }
      },

      '&$selected': {
        color: palette.blue.main,
        backgroundColor: palette.blue.lighter
      },

      '&:focus': {
        color: palette.blue.main,
        backgroundColor: 'initial'
      }
    },
    selected: {},
    label: {
      marginLeft: '1.875em'
    },
    withIcon: {
      marginLeft: '0.875em'
    },
    labelContent: {
      fontSize: '0.875em',
      lineHeight: '1.5em'
    },
    accordion: {
      '&:before, &:after, &:first-child:before': {
        display: 'none'
      }
    },
    summary: {
      padding: 0
    },
    details: {
      fontSize: 'inherit',
      marginBottom: '0'
    },
    content: {
      fontSize: 'inherit'
    },
    expandIcon: {
      margin: '0.25em'
    }
  })
