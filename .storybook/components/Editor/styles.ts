import { makeStyles } from '@toptal/picasso-provider'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',

    '& *': {
      fontFamily:
        "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
    },
  },
}))

export default useStyles
