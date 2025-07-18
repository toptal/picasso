import React, { useCallback } from 'react'
import type { FormProps } from '@toptal/picasso-form'
import { Form } from '@toptal/picasso-form'
import { Container } from '@toptal/picasso-container'

export interface Props extends FormProps {
  setActiveFieldTouched: () => void
  validateOnBlur?: boolean
}
export const FormRenderer = (props: Props) => {
  const { onSubmit, setActiveFieldTouched, children, validateOnBlur, ...rest } =
    props

  const handleNativeSubmit = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      if (validateOnBlur) {
        // force validation for active field
        setActiveFieldTouched()
      }

      onSubmit?.(event)
    },
    [onSubmit, setActiveFieldTouched, validateOnBlur]
  )

  return (
    <Container>
      <Form {...rest} onSubmit={handleNativeSubmit}>
        {children}
      </Form>
    </Container>
  )
}

FormRenderer.displayName = 'FormRenderer'

export default FormRenderer
