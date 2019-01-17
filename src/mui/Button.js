import color from 'color'
import MUIButton from '@material-ui/core/Button'

import { PicassoProvider } from '../../components/Picasso'

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

PicassoProvider.override(({ pallete }) => ({
  MuiButton: {
    root: {
      textTransform: 'none',
      padding: '6px 16px',
      fontSize: '16px'
    },
    containedPrimary: createButtonVariant(
      VARIANTS.containedPrimary,
      pallete.primary.main,
      pallete.primary.main
    ),
    containedSecondary: createButtonVariant(
      VARIANTS.containedSecondary,
      pallete.secondary.main,
      pallete.secondary.main
    ),
    outlinedPrimary: createButtonVariant(
      VARIANTS.outlinedPrimary,
      pallete.primary.main,
      pallete.primary.main
    ),
    outlinedSecondary: createButtonVariant(
      VARIANTS.outlinedSecondary,
      pallete.secondary.main,
      pallete.secondary.main
    ),
    outlined: createButtonVariant(
      VARIANTS.outlined,
      pallete.grey[50],
      pallete.grey[100]
    ),
    flat: createButtonVariant(
      VARIANTS.flat,
      pallete.grey[100],
      pallete.grey[100]
    ),
    flatPrimary: createButtonVariant(
      VARIANTS.flat,
      pallete.primary.main,
      pallete.primary.main
    ),
    flatSecondary: createButtonVariant(
      VARIANTS.flat,
      pallete.secondary.main,
      pallete.secondary.main
    )
  }
}))

export default MUIButton
