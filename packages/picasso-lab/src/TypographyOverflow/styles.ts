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
      textOverflow: 'ellipsis',
      /**
       * Workaround for `textOverflow: ellipsis`.
       * Browser can show ellipsis at the end, even if it's not required -
       * it's possible if the text has the very same width as the container
       * (ellipsis width will be the same as the width of the text hidden by these ellipsis).
       * It could be also affected by the font itself, when it has wider render bouncing borders.
       * So to be sure, that text container in slightly wider than parent,
       * we have to to add some super-minor space at the end.
       */
      paddingRight: '0.9px'
    })
  })
