import color from 'color'

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
) => {
  return variant(background, border)
}
