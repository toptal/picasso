import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'

import type { Props } from './LinkPluginModal'
import LinkPluginModal from './LinkPluginModal'

const renderModal = (props: Partial<Props> = {}) => {
  const handlers = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    onRemove: jest.fn(),
  }

  render(
    <LinkPluginModal
      open
      editing={false}
      initialValues={{ text: '', url: '', openInNewTab: false }}
      {...handlers}
      {...props}
    />
  )

  return handlers
}

const type = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } })

describe('LinkPluginModal', () => {
  it('submits the text, the URL and whether to open in a new tab', () => {
    const { onSubmit } = renderModal()

    type('Text', 'Book a call')
    type('Link', ' https://toptal.com/book ')
    fireEvent.click(screen.getByLabelText('Open in new tab'))
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledWith({
      text: 'Book a call',
      url: 'https://toptal.com/book',
      openInNewTab: true,
    })
  })

  it('opens links in the same tab unless chosen otherwise', () => {
    const { onSubmit } = renderModal()

    type('Link', 'https://toptal.com')
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ openInNewTab: false })
    )
  })

  it('rejects an invalid URL', () => {
    const { onSubmit } = renderModal()

    type('Link', 'not a url')
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Enter a valid URL')).toBeInTheDocument()
  })

  it('disables saving until a URL is entered', () => {
    renderModal()

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('prefills an edited link and offers to remove it', () => {
    const { onRemove } = renderModal({
      editing: true,
      initialValues: {
        text: 'Toptal',
        url: 'https://toptal.com',
        openInNewTab: true,
      },
    })

    expect(screen.getByText('Edit link')).toBeInTheDocument()
    expect(screen.getByLabelText('Text')).toHaveValue('Toptal')
    expect(screen.getByLabelText('Link')).toHaveValue('https://toptal.com')
    expect(screen.getByLabelText('Open in new tab')).toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: 'Remove link' }))

    expect(onRemove).toHaveBeenCalled()
  })

  it('does not offer removing a new link', () => {
    renderModal()

    expect(screen.getByText('Add link')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Remove link' })
    ).not.toBeInTheDocument()
  })

  it('focuses the link field when text is already selected', () => {
    renderModal({
      initialValues: { text: 'Toptal', url: '', openInNewTab: false },
    })

    expect(screen.getByLabelText('Link')).toHaveFocus()
  })

  it('focuses the text field when nothing is selected', () => {
    renderModal()

    expect(screen.getByLabelText('Text')).toHaveFocus()
  })

  it('resets the form when it opens with new values', () => {
    const props = {
      open: true,
      editing: false,
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      onRemove: jest.fn(),
    }
    const { rerender } = render(
      <LinkPluginModal
        {...props}
        initialValues={{ text: 'Old', url: '', openInNewTab: false }}
      />
    )

    type('Link', 'not a url')
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    rerender(
      <LinkPluginModal
        {...props}
        initialValues={{ text: 'New', url: '', openInNewTab: true }}
      />
    )

    expect(screen.getByLabelText('Text')).toHaveValue('New')
    expect(screen.getByLabelText('Link')).toHaveValue('')
    expect(screen.getByLabelText('Open in new tab')).toBeChecked()
    expect(screen.queryByText('Enter a valid URL')).not.toBeInTheDocument()
  })

  it('focuses the link field when it reopens with selected text', () => {
    const props = {
      editing: false,
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      onRemove: jest.fn(),
    }
    const { rerender } = render(
      <LinkPluginModal
        {...props}
        open={false}
        initialValues={{ text: '', url: '', openInNewTab: false }}
      />
    )

    rerender(
      <LinkPluginModal
        {...props}
        open
        initialValues={{ text: 'Toptal', url: '', openInNewTab: false }}
      />
    )

    expect(screen.getByLabelText('Link')).toHaveFocus()
  })
})
