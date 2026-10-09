import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { Button } from '@toptal/picasso-button'
import { Checkbox } from '@toptal/picasso-checkbox'
import { FormCompound as Form } from '@toptal/picasso-form'
import { Input } from '@toptal/picasso-input'
import { ModalCompound as Modal } from '@toptal/picasso-modal'
import type { BaseProps } from '@toptal/picasso-shared'

import { INTERNAL_DIALOG_ATTRIBUTE } from '../../LexicalEditor/hooks/useOnFocus/use-on-focus'
import { validateUrl } from './utils/url'

export type LinkValues = {
  text: string
  url: string
  openInNewTab: boolean
}

export interface Props extends BaseProps {
  /** Whether the dialog is shown */
  open: boolean
  /** Values the form opens with: the selected text, or the link being edited */
  initialValues: LinkValues
  /** Whether an existing link is being edited, which offers removing it */
  editing: boolean
  /** Called when the dialog is dismissed without saving */
  onClose: () => void
  /** Called with the entered values when the link is saved */
  onSubmit: (values: LinkValues) => void
  /** Called when the edited link is removed */
  onRemove: () => void
}

const LinkPluginModal = ({
  open,
  initialValues,
  editing,
  onClose,
  onSubmit,
  onRemove,
  className,
  style,
  'data-testid': testId,
}: Props): ReactElement => {
  const [values, setValues] = useState(initialValues)
  const [urlError, setUrlError] = useState(false)
  const [shownValues, setShownValues] = useState(initialValues)

  // Reset the form during render, not in an effect: the fields mount with the
  // dialog, and their autoFocus must see the values it opened with
  if (shownValues !== initialValues) {
    setShownValues(initialValues)
    setValues(initialValues)
    setUrlError(false)
  }

  // With text selected only the URL is missing, so start there
  const focusUrl = Boolean(initialValues.text)

  const handleSave = () => {
    const url = values.url.trim()

    if (!validateUrl(url)) {
      setUrlError(true)

      return
    }

    onSubmit({ ...values, url })
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
      size='small'
      className={className}
      style={style}
      data-testid={testId}
      {...{ [INTERNAL_DIALOG_ATTRIBUTE]: '' }}
    >
      <Modal.Title>{editing ? 'Edit link' : 'Add link'}</Modal.Title>
      <Modal.Content>
        <Form.Field>
          <Form.Label htmlFor='rte-link-text'>Text</Form.Label>
          <Input
            id='rte-link-text'
            value={values.text}
            onChange={event =>
              setValues({ ...values, text: event.target.value })
            }
            width='full'
            autoFocus={!focusUrl}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor='rte-link-url'>Link</Form.Label>
          <Input
            id='rte-link-url'
            value={values.url}
            onChange={event => {
              setValues({ ...values, url: event.target.value })
              setUrlError(false)
            }}
            status={urlError ? 'error' : undefined}
            width='full'
            autoFocus={focusUrl}
          />
          {urlError && <Form.Error>Enter a valid URL</Form.Error>}
        </Form.Field>
        <Form.Field>
          <Checkbox
            label='Open in new tab'
            checked={values.openInNewTab}
            onChange={(_event, checked) =>
              setValues({ ...values, openInNewTab: checked })
            }
          />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        {editing && (
          <Button variant='secondary' onClick={onRemove}>
            Remove link
          </Button>
        )}
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='primary'
          disabled={!values.url.trim()}
          onClick={handleSave}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default LinkPluginModal
