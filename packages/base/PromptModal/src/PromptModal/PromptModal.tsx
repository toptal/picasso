import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { Button } from '@toptal/picasso-button'
import { noop, useSafeState } from '@toptal/picasso-utils'
import type { Props as ModalProps } from '@toptal/picasso-modal'
import { ModalCompound as Modal } from '@toptal/picasso-modal'
import type { VariantType as ButtonVariantType } from '@toptal/picasso-button'

export type VariantType = 'positive' | 'negative'

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
  /** Different Prompt variants used for different intention */
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
  testIds?: {
    title?: string
    message?: string
    closeButton?: string
    submitButton?: string
  }
}

export const PromptModal = forwardRef<HTMLDivElement, Props>(
  function PromptModal(props, ref) {
    const {
      children,
      title,
      message,
      variant,
      submitText,
      cancelText,
      onSubmit,
      onAfterSubmit = noop,
      onCancel = noop,
      onClose,
      testIds,
      ...rest
    } = props
    const [result, setResult] = useSafeState<unknown>()
    const [loading, setLoading] = useSafeState(false)
    const [error, setError] = useSafeState(false)

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
      onAfterSubmit()
      handleClose()
    }

    const handleCancel = () => {
      onCancel()
      handleClose()
    }

    const handleClose = () => {
      setResult(undefined)

      if (onClose) {
        onClose()
      }
    }

    return (
      <Modal ref={ref} onClose={onClose && handleClose} {...rest}>
        {title && (
          <Modal.Title data-testid={testIds?.title}>{title}</Modal.Title>
        )}
        <Modal.Content>
          <Typography size='medium' data-testid={testIds?.message}>
            {message}
          </Typography>
          {children && (
            <Container top='xsmall'>
              {children({
                setResult,
                result,
                setLoading,
                loading,
                setError,
                error,
              })}
            </Container>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={loading}
            variant='secondary'
            onClick={handleCancel}
            data-testid={testIds?.closeButton}
          >
            {cancelText}
          </Button>
          <Button
            loading={loading}
            onClick={handleSubmit}
            variant={`${variant}` as ButtonVariantType}
            data-testid={testIds?.submitButton}
          >
            {submitText}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
)

PromptModal.defaultProps = {
  cancelText: 'Cancel',
  onCancel: noop,
  size: 'small',
  submitText: 'Submit',
  variant: 'positive',
  onAfterSubmit: noop,
}

PromptModal.displayName = 'PromptModal'

export default PromptModal
