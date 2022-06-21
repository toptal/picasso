const NOT_HIDDEN_INPUT_SELECTOR = 'input:not([type=hidden])'

export const scrollTo = (field: HTMLElement) => {
  if (typeof field.scrollIntoView === 'function') {
    field.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
  field
    .querySelector<HTMLInputElement>(NOT_HIDDEN_INPUT_SELECTOR)
    ?.focus({ preventScroll: true })
}
