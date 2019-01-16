import { PicassoProvider } from '../Picasso'
import { RENDER_METHODS } from './utils/renderMethods'

const CONFIGURATION = ({ primary, secondary, grey, error, common }) => ({
  // contained variants
  contained: [RENDER_METHODS.contained, grey[50], common.black],
  containedPrimary: [RENDER_METHODS.contained, primary.main, common.white],
  containedSecondary: [RENDER_METHODS.contained, secondary.main, common.white],
  containedNegative: [RENDER_METHODS.contained, error.main, common.white],
  // outlined variants
  outlined: [RENDER_METHODS.outlined, grey[50], grey[100]],
  outlinedPrimary: [RENDER_METHODS.outlined, primary.main, primary.main],
  outlinedSecondary: [RENDER_METHODS.outlined, secondary.main, secondary.main],
  outlinedNegative: [RENDER_METHODS.outlined, error.main, error.main],
  // text (flat legacy) variants
  text: [RENDER_METHODS.text, grey[100], false],
  textPrimary: [RENDER_METHODS.text, primary.main, false],
  textSecondary: [RENDER_METHODS.text, secondary.main, false],
  textNegative: [RENDER_METHODS.text, error.main, false]
})

PicassoProvider.override(({ typography, transitions }) => ({
  MuiButton: {
    root: {
      textTransform: 'none',
      fontSize: typography.button.fontSize,
      padding: '0 1rem',
      transition: `border ${transitions.duration.short}ms ${
        transitions.easing.easeOut
      }, color ${transitions.duration.short}ms ${
        transitions.easing.easeOut
      }, background ${transitions.duration.short}ms ${
        transitions.easing.easeOut
      }`
    },
    label: {}
  }
}))

export default ({ palette }) => {
  const commonStyles = {
    icon: {
      fontSize: '1em',
      paddingRight: '0.45em'
    },
    compact: {
      minWidth: 'auto',
      '& $icon': {
        padding: 'initial'
      }
    }
  }

  const variants = CONFIGURATION(palette)

  for (const variant in variants) {
    const [renderMethod, primaryColor, secondaryColor] = variants[variant]

    commonStyles[variant] = renderMethod(primaryColor, secondaryColor)
  }

  return commonStyles
}
