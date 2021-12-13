import { FormApi } from 'final-form'

import { scrollTo } from './scroll-to'

type ScrollToErrorProps = {
  disableScrollOnError?: boolean
}

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

let state: { errors?: object; submitErrors?: object } = {}

export default ({ disableScrollOnError }: ScrollToErrorProps = {}) => <T>(
  form: FormApi<T>
) => {
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
        scrollTo(field)
      }
    }
  }

  // Rewrite submit function
  form.submit = () => {
    const result = originalSubmit.call(form)

    if (disableScrollOnError) {
      return result
    }

    if (result && typeof result.then === 'function') {
      result.then(scrollOnErrors).catch(() => {})
    } else {
      scrollOnErrors()
    }

    return result
  }

  return () => {
    state = {}
    unsubscribe()
    form.submit = originalSubmit
  }
}
