import React, { forwardRef, ReactNode, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Container from '../Container'
import Typography from '../Typography'
import Modal, { Props as ModalProps } from '../Modal'
import Button, { VariantType as ButtonVariantType } from '../Button'
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
  onAfterSubmit?: () => void
  /** Callback on Cancel onClick event */
  onCancel?: () => void
  onClose?: () => void
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
    onAfterSubmit,
    onCancel,
    onClose,
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
      setLoading(false)

      handleOnAfterSubmit()
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  const handleOnAfterSubmit = () => {
    onAfterSubmit!()
    handleClose()
  }

  const handleCancel = () => {
    onCancel!()
    handleClose()
  }

  const handleClose = () => {
    setResult(undefined)

    if (onClose) {
      onClose!()
    }
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal ref={ref} onClose={onClose && handleClose} {...rest}>
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
        <Button disabled={loading} variant='flat' onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button
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
  variant: 'green',
  onAfterSubmit: () => {}
}

PromptModal.displayName = 'PromptModal'

export default withStyles(styles)(PromptModal)
