import React from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { useFormState } from 'react-final-form'
import { ButtonCircularProps } from '@toptal/picasso/ButtonCircular'

type ButtonTypeProps = {
  buttonType: 'rectangular'
  variant?: ButtonProps['variant']
}

type CircularButtonTypeProps = {
  buttonType: 'circular'
  variant?: ButtonCircularProps['variant']
}

type ActionButtonTypeProps = {
  buttonType: 'action'
  variant?: null
}

// Intersection with the type { id?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = Omit<ButtonProps, 'type' | 'variant'> & {
  id?: string
} & (CircularButtonTypeProps | ActionButtonTypeProps | ButtonTypeProps)

export const SubmitButton = ({
  buttonType,
  variant,
  ...restOfProps
}: Props) => {
  /* eslint-disable react/jsx-props-no-spreading */
  const { submitting } = useFormState({ subscription: { submitting: true } })

  const submitButtonProps = {
    type: 'submit' as const,
    loading: submitting
  }

  const resultComponentProps = { ...submitButtonProps, ...restOfProps }

  switch (buttonType) {
    case 'circular':
      return (
        <Button.Circular
          {...resultComponentProps}
          variant={variant as ButtonCircularProps['variant']}
        />
      )
    case 'action':
      return <Button.Action {...resultComponentProps} />
    default:
      return (
        <Button
          {...resultComponentProps}
          variant={variant as ButtonProps['variant']}
        />
      )
  }
}

SubmitButton.defaultProps = {
  buttonType: 'rectangular'
}

SubmitButton.displayName = 'SubmitButton'

export default SubmitButton
