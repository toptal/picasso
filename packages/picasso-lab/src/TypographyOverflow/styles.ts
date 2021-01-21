import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    wrapper: ({ lines = 1 }: { lines?: number }) => {
      const multiline = lines > 1

      return {
        '-webkit-line-clamp': lines,
        '-webkit-box-orient': 'vertical',
        display: multiline ? '-webkit-box' : 'block',
        whiteSpace: multiline ? 'initial' : 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  })
