import { FormApi } from 'final-form'

const UNHIDDEN_INPUT_SELECTOR = 'input:not([type=hidden])'

const findFirstFieldWithError = (): HTMLElement | null => {
  if (typeof document === 'undefined') return null

  return document.querySelector<HTMLElement>('[data-field-has-error="true"]')
}

const scrollToError = () => {
  const field = findFirstFieldWithError()

  if (!field) return

  field.scrollIntoView({ block: 'center', behavior: 'smooth' })
  field
    .querySelector<HTMLInputElement>(UNHIDDEN_INPUT_SELECTOR)
    ?.focus({ preventScroll: true })
}

export default () => <T>(form: FormApi<T>) => {
  const originalSubmit = form.submit
  let state: { errors?: object; submitErrors?: object } = {}

  const unsubscribe = form.subscribe(
    nextState => {
      state = nextState
    },
    { errors: true, submitErrors: true }
  )

  const scrollOnErrors = () => {
    const { errors = {}, submitErrors = {} } = state

    if (Object.keys(errors).length || Object.keys(submitErrors).length) {
      scrollToError()
    }
  }

  // Rewrite submit function
  form.submit = () => {
    const result = originalSubmit.call(form)

    if (result && typeof result.then === 'function') {
      result.then(scrollOnErrors).catch(() => {})
    } else {
      scrollOnErrors()
    }

    return result
  }

  return () => {
    unsubscribe()
    form.submit = originalSubmit
  }
}
