import color from 'color'

import { PicassoProvider } from '../Picasso'

const flatButton = (background, border) => ({
  backgroundColor: '#fff',
  color: background,
  '&:hover': {
    backgroundColor: '#fff',
    color: border
  }
})

const outlinedButton = (background, border) => ({
  backgroundColor: '#fff',
  border: `1px solid ${background}`,
  color: border,
  '&:hover': {
    backgroundColor: '#fff',
    border: `1px solid ${color(background)
      .darken(0.3)
      .hex()}`
  }
})

const containedButton = (background, border) => ({
  backgroundColor: background,
  border: `1px solid ${border}`,
  '&:hover': {
    backgroundColor: color(background)
      .darken(0.1)
      .hex(),
    border: `1px solid ${border}`
  }
})

const RENDER_METHODS = {
  outlined: outlinedButton,
  contained: containedButton,
  flat: flatButton
}

export const VARIANTS = {
  outlined: RENDER_METHODS.outlined,
  outlinedPrimary: RENDER_METHODS.outlined,
  outlinedSecondary: RENDER_METHODS.outlined,
  contained: RENDER_METHODS.contained,
  containedPrimary: RENDER_METHODS.contained,
  containedSecondary: RENDER_METHODS.contained,
  flat: RENDER_METHODS.flat,
  flatPrimary: RENDER_METHODS.flat,
  flatSecondary: RENDER_METHODS.flat
}

export const createButtonVariant = (
  variant = VARIANTS.outlined,
  background,
  border
) => variant(background, border)

PicassoProvider.override(({ palette }) => ({
  MuiButton: {
    root: {
      textTransform: 'none',
      padding: '6px 16px',
      fontSize: '16px'
    },
    containedPrimary: createButtonVariant(
      VARIANTS.containedPrimary,
      palette.primary.main,
      palette.primary.main
    ),
    containedSecondary: createButtonVariant(
      VARIANTS.containedSecondary,
      palette.secondary.main,
      palette.secondary.main
    ),
    outlinedPrimary: createButtonVariant(
      VARIANTS.outlinedPrimary,
      palette.primary.main,
      palette.primary.main
    ),
    outlinedSecondary: createButtonVariant(
      VARIANTS.outlinedSecondary,
      palette.secondary.main,
      palette.secondary.main
    ),
    outlined: createButtonVariant(
      VARIANTS.outlined,
      palette.grey[50],
      palette.grey[100]
    ),
    flat: createButtonVariant(
      VARIANTS.flat,
      palette.grey[100],
      palette.grey[100]
    ),
    flatPrimary: createButtonVariant(
      VARIANTS.flat,
      palette.primary.main,
      palette.primary.main
    ),
    flatSecondary: createButtonVariant(
      VARIANTS.flat,
      palette.secondary.main,
      palette.secondary.main
    )
  }
}))

export default {
  Button: {
    icon: {
      fontSize: '1em',
      paddingRight: '0.75em'
    }
  }
}
