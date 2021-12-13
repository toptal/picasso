import { FormApi } from 'final-form'

type ScrollToErrorProps = {
  autoScrollOnErrors?: boolean
  autoFocusOnScrollToErrors?: boolean
}

const UNHIDDEN_INPUT_SELECTOR = 'input:not([type=hidden])'

const getErrorField = () =>
  document.querySelector<HTMLElement>('[data-field-has-error="true"]')

const getErrorFieldAfterNextPaint = () =>
  new Promise<HTMLElement | null>(resolve => {
    const resolveField = () => resolve(getErrorField())

    if (typeof requestAnimationFrame === 'undefined') {
      setTimeout(resolveField, 16)
    } else {
      requestAnimationFrame(resolveField)
    }
  })

const getErrorFieldWithRetries = async () => {
  for (let index = 0; index < 3; index++) {
    const field = await getErrorFieldAfterNextPaint()

    if (field) {
      return field
    }
  }
}

const scrollTo = (
  field: HTMLElement,
  options?: { autoFocusOnScrollToErrors: boolean }
) => {
  field.scrollIntoView({ block: 'center', behavior: 'smooth' })
  if (options?.autoFocusOnScrollToErrors) {
    field
      .querySelector<HTMLInputElement>(UNHIDDEN_INPUT_SELECTOR)
      ?.focus({ preventScroll: true })
  }
}

let state: { errors?: object; submitErrors?: object } = {}

export default ({
  autoScrollOnErrors = true,
  autoFocusOnScrollToErrors = true
}: ScrollToErrorProps = {}) => <T>(form: FormApi<T>) => {
  const originalSubmit = form.submit

  const unsubscribe = form.subscribe(
    nextState => {
      state = nextState
    },
    { errors: true, submitErrors: true }
  )

  const scrollOnErrors = async () => {
    const { errors = {}, submitErrors = {} } = state

    if (Object.keys(errors).length || Object.keys(submitErrors).length) {
      const field = await getErrorFieldWithRetries()

      if (field) {
        scrollTo(field, { autoFocusOnScrollToErrors })
      }
    }
  }

  // Rewrite submit function
  form.submit = () => {
    const result = originalSubmit.call(form)

    if (autoScrollOnErrors) {
      if (result && typeof result.then === 'function') {
        result.then(scrollOnErrors).catch(() => {})
      } else {
        scrollOnErrors()
      }
    }

    return result
  }

  return () => {
    state = {}
    unsubscribe()
    form.submit = originalSubmit
  }
}
