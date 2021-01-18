import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    wrapper: {
      '-webkit-line-clamp': ({ lines = 1 }: { lines?: number }) => lines,
      '-webkit-box-orient': 'vertical',
      display: ({ lines = 1 }: { lines?: number }) =>
        lines > 1 ? '-webkit-box' : 'block',
      whiteSpace: ({ lines = 1 }: { lines?: number }) =>
        lines > 1 ? 'initial' : 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  })
