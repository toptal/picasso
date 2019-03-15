export default {
  root: {
    '& code': {
      backgroundColor: 'rgb(236, 236, 236, 0.5)',
      borderRadius: '0.4em',
      padding: '0.3em 0.7em',
      fontWeight: 400,
      fontSize: '0.8em',
      fontFamily:
        "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace"
    },
    '& p:first-child': {
      marginTop: 0
    },
    '& p:last-child': {
      marginBottom: 0
    },
    '& pre': {
      backgroundColor: 'rgb(236, 236, 236, 0.5)',

      '& code': {
        padding: '0em',
        backgroundColor: 'initial'
      }
    }
  }
}
