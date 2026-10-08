import React, { useEffect, useState } from 'react'
import { Button } from '@toptal/picasso-button'
import { Checkbox } from '@toptal/picasso-checkbox'
import { FormCompound as Form } from '@toptal/picasso-form'
import { Input } from '@toptal/picasso-input'
import { ModalCompound as Modal } from '@toptal/picasso-modal'

import { validateUrl } from './utils/url'

export type LinkValues = {
  text: string
  url: string
  openInNewTab: boolean
}

export type Props = {
  isOpen: boolean
  /** Values the form opens with: the selected text, or the link being edited */
  initialValues: LinkValues
  /** Whether an existing link is being edited, which offers removing it */
  editing: boolean
  onClose: () => void
  onSubmit: (values: LinkValues) => void
  onRemove: () => void
}

const LinkPluginModal = ({
  isOpen,
  initialValues,
  editing,
  onClose,
  onSubmit,
  onRemove,
}: Props) => {
  const [values, setValues] = useState(initialValues)
  const [urlError, setUrlError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues)
      setUrlError(false)
    }
  }, [isOpen, initialValues])

  const handleSave = () => {
    const url = values.url.trim()

    if (!validateUrl(url)) {
      setUrlError(true)

      return
    }

    onSubmit({ ...values, url })
  }

  return (
    <Modal onClose={onClose} open={isOpen} size='small'>
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
            autoFocus={!values.text}
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
            autoFocus={Boolean(values.text)}
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
