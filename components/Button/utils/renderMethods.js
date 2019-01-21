import { darken } from '../../styles'

export const outlinedButton = (primary, secondary) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${primary}`,
  color: secondary,
  '&:hover': {
    backgroundColor: 'transparent',
    border: `1px solid ${darken(secondary, 0.3)}`,
    color: darken(secondary, 0.3)
  }
})

export const containedButton = (primary, secondary) => ({
  backgroundColor: primary,
  border: `1px solid ${primary}`,
  color: secondary,
  '&:hover': {
    backgroundColor: darken(primary, 0.2),
    border: `1px solid ${darken(secondary, 0.2)}`
  }
})

export const textButton = primary => ({
  color: primary,
  '&:hover': {
    backgroundColor: 'transparent',
    color: darken(primary, 0.3)
  }
})

export const RENDER_METHODS = {
  contained: containedButton,
  outlined: outlinedButton,
  text: textButton
}
