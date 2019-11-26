import React, { forwardRef, ReactNode, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Container, Typography, Modal } from '@toptal/picasso'
import { Props as ModalProps } from '@toptal/picasso/Modal'
import { VariantType as ButtonVariantType } from '@toptal/picasso/Button'

import styles from './styles'

export type VariantType = 'red' | 'blue' | 'green'

export type PromptOptions = {
  setResult: (newResult: unknown) => void
  result: unknown
  setLoading: (loading: boolean) => void
  loading: boolean
  setError: (error: boolean) => void
  error: boolean
}

export interface Props extends Omit<ModalProps, 'children' | 'onSubmit'> {
  /** Pass input component to allow you get input value from prompt modal */
  children?: (result: PromptOptions) => ReactNode
  /** Title of modal */
  title: string
  /** Prompt message */
  message: string
  /** Different Prompt variants used for differnt intention */
  variant?: VariantType
  /** Text on Submit button */
  submitText?: string
  /** Text on Cancel button */
  cancelText?: string
  /** Callback on Submit onClick event, returns result of input component if defined */
  onSubmit: (result: unknown) => Promise<unknown> | unknown
  /** Callback on Cancel onClick event */
  onCancel?: () => void
}

export const PromptModal = forwardRef<HTMLElement, Props>(function PromptModal(
  props,
  ref
) {
  const {
    children,
    title,
    message,
    variant,
    submitText,
    cancelText,
    onSubmit,
    onCancel,
    ...rest
  } = props
  const [result, setResult] = useState<unknown>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(false)

      await onSubmit(result)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal ref={ref} {...rest}>
      {title && <Modal.Title>{title}</Modal.Title>}
      <Modal.Content>
        <Typography size='medium'>{message}</Typography>
        {children && (
          <Container top='xsmall'>
            {children({
              setResult,
              result,
              setLoading,
              loading,
              setError,
              error
            })}
          </Container>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={loading} variant='flat' onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
          disabled={loading}
          loading={loading}
          onClick={handleSubmit}
          variant={`primary-${variant}` as ButtonVariantType}
        >
          {submitText}
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

PromptModal.defaultProps = {
  cancelText: 'Cancel',
  onCancel: () => {},
  size: 'small',
  submitText: 'Submit',
  variant: 'green'
}

PromptModal.displayName = 'PromptModal'

export default withStyles(styles)(PromptModal)
