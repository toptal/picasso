import { Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

const highlightAutofillStyles = ({ palette }: Theme) => ({
  highlightAutofill: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    backgroundColor: alpha(palette.yellow.lighter!, 0.6),
  },
})

export default highlightAutofillStyles
