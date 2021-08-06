// import { PicassoProvider } from '@toptal/picasso-provider'
import { Theme, createStyles } from '@material-ui/core/styles'

// PicassoProvider.override(({ palette }: Theme) => ({}))

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderRadius: '0.4rem',
      border: `1px solid ${palette.grey.lighter}`,
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        background: palette.yellow.main,
        display: 'block',
        height: '100%',
        left: 0,
        position: 'absolute',
        content: '""',
        top: 0,
        width: '0.2rem'
      }
    },
    inner: {
      padding: '1.75rem'
    }
  })
