const UNHIDDEN_INPUT_SELECTOR = 'input:not([type=hidden])'

export const scrollTo = (field: HTMLElement) => {
  if (typeof field.scrollIntoView === 'function') {
    field.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
  field
    .querySelector<HTMLInputElement>(UNHIDDEN_INPUT_SELECTOR)
    ?.focus({ preventScroll: true })
}
