import { FormApi, getIn } from 'final-form'
import flatMap from './flat-map'

const scrollTo = (options: ScrollToOptions) => {
  try {
    window.scrollTo(options)
  } catch {
    window.scrollTo(options.left ?? 0, options.top ?? 0)
  }
}

const formInputs = (form: HTMLFormElement) =>
  Array.from(form.elements).filter(
    element => element instanceof HTMLInputElement && typeof element.focus === 'function'
  ) as HTMLInputElement[]

const getInputs = (): HTMLInputElement[] => {
  if (typeof document === 'undefined') return []
  return flatMap(Array.from(document.forms), formInputs)
}

const findInputWithError = (inputs: HTMLInputElement[], errors: {}) =>
  inputs.find(input => input.name && getIn(errors, input.name))

const scrollToError = (offsetTop: number, errors: object) => {
  const firstInput = findInputWithError(getInputs(), errors)
  if (!firstInput) return

  firstInput.focus({ preventScroll: true })
  const top =
    firstInput.getBoundingClientRect().top + window.pageYOffset - offsetTop
  scrollTo({ top, behavior: 'smooth' })
}

export default ({ scrollOffsetTop = 0 }: { scrollOffsetTop?: number }) => <T>(
  form: FormApi<T>
) => {
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
      scrollToError(scrollOffsetTop, errors)
    } else if (Object.keys(submitErrors).length) {
      scrollToError(scrollOffsetTop, submitErrors)
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
