import React, { forwardRef, ReactNode, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Container from '../Container'
import Modal from '../Modal'
import { Props as ModalProps } from '../Modal/Modal'
import Button from '../Button'
import { VariantType as ButtonVariantType } from '../Button/Button'
import Typography from '../Typography'
import styles from './styles'

export type VariantType = 'red' | 'blue' | 'green'

export interface Props extends Omit<ModalProps, 'children'> {
  /** Pass input component to allow you get input value from prompt modal */
  children?: (setResult: (newResult: any) => void, result: any) => ReactNode
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
  onSubmit: (result?: any) => void
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

  const [result, setResult] = useState<any>()
  const handleResultChange = (newResult: any) => {
    setResult(newResult)
  }

  const handleSubmit = () => {
    onSubmit(result)
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal ref={ref} {...rest}>
      {title && <Modal.Title>{title}</Modal.Title>}
      <Modal.Content>
        <Typography size='medium'>{message}</Typography>
        {children && (
          <Container top='xsmall'>
            {children(handleResultChange, result)}
          </Container>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={false} variant='flat' onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
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
