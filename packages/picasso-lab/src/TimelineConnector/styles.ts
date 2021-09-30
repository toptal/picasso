import { createStyles, Theme } from '@material-ui/core/styles'
import { dashedBackground } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '1px',
      backgroundImage: dashedBackground(6, 4, palette.grey.main!),
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat'
    }
  })
