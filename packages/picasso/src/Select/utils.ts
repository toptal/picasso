import { Props } from './Select'

const isAttributeProvided = (value: string | undefined) =>
  typeof value === 'string'

const getAutofillAttributes = ({
  enableAutofill,
  native,
  autoComplete,
  name
}: Partial<Props>) => {
  let autofillAttributes = {}

  if (isAttributeProvided(name)) {
    if (enableAutofill || native) {
      autofillAttributes = { ...autofillAttributes, name }
    }
  }

  if (enableAutofill) {
    if (autoComplete) {
      autofillAttributes = { ...autofillAttributes, autoComplete }
    }
  } else {
    autofillAttributes = { ...autofillAttributes, autoComplete: 'off' }
  }

  return autofillAttributes
}

export { getAutofillAttributes, isAttributeProvided }
