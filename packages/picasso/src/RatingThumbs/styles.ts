import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    radio: {
      display: 'none'
    },
    label: {
      '&:not(:last-child)': {
        marginRight: '1em'
      }
    },
    thumbs: {
      cursor: 'pointer'
    }
  })
