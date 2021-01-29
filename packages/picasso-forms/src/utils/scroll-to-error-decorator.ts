import { FormApi } from 'final-form'

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

const scrollTo = (field: HTMLElement) => {
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

  const scrollOnErrors = async () => {
    const { errors = {}, submitErrors = {} } = state

    if (Object.keys(errors).length || Object.keys(submitErrors).length) {
      const field = await getErrorFieldWithRetries()

      if (field) {
        scrollTo(field)
      }
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
