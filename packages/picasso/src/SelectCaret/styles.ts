import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    caret: {
      position: 'absolute',
      top: 'calc(50% - 0.5rem)',
      // in specs right spacing is defined relative to 6px icon width, while we use 16px
      // so 5px are left instead of 10px when we use wider icon.
      right: '0.3125rem',
      color: palette.grey.dark,
      fontSize: '1rem',
      cursor: 'inherit'
    },
    caretDisabled: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      color: alpha(palette.grey.dark!, 0.48),
      zIndex: 1
    }
  })
