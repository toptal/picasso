import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    singleLine: {
      display: 'block',
      whiteSpace: 'nowrap'
    },
    multiLine: {
      display: '-webkit-box',
      whiteSpace: 'initial',
      wordBreak: 'break-word'
    },
    wrapper: ({ lines = 1 }: { lines?: number }) => ({
      '-webkit-line-clamp': lines,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    })
  })
