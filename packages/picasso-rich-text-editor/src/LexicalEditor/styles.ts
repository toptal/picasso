// import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default () => {
  return createStyles({
    editorContainer: {
      height: '12.5em',
      overflowY: 'hidden',
      resize: 'vertical',
      position: 'relative',
      fontSize: '14px',
      // ...listStyles,
      // ...margins,
      // ...quillSpecificStyles(theme),
    },

    contentEditable: {
      outline: 'none',
      height: '100%',
      padding: '1em 0.5em',
      tabSize: 4,
      overflowY: 'auto',
    },

    placeholder: {
      overflow: 'hidden',
      position: 'absolute',
      textOverflow: 'ellipsis',
      top: '0px',
      left: '0px',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      pointerEvents: 'none',
    },

    paragraph: {
      margin: '0 0 0.5rem',
    },
  })
}
