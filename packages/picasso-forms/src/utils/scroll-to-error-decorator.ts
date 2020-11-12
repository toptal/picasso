import { FormApi, getIn } from 'final-form'

import flatMap from './flat-map'

const formInputs = (form: HTMLFormElement) =>
  Array.from(form.elements).filter(
    element =>
      element instanceof HTMLElement && typeof element.focus === 'function'
  ) as HTMLInputElement[]

const getInputs = (): HTMLInputElement[] => {
  if (typeof document === 'undefined') return []

  return flatMap(Array.from(document.forms), formInputs)
}

const findInputWithError = (inputs: HTMLInputElement[], errors: {}) =>
  inputs.find(input => {
    if (!input.name) {
      return false
    }

    const error = getIn(errors, input.name)

    return error && typeof error === 'string'
  })

const scrollToError = (errors: object) => {
  const firstInput = findInputWithError(getInputs(), errors)

  if (!firstInput) return

  firstInput.focus({ preventScroll: true })
  firstInput.scrollIntoView({ block: 'center', behavior: 'smooth' })
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

    if (Object.keys(errors).length) {
      scrollToError(errors)
    } else if (Object.keys(submitErrors).length) {
      scrollToError(submitErrors)
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
