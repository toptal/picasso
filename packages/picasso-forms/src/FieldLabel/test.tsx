import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Form from '../Form'
import FieldLabel from './FieldLabel'

describe('FieldLabel', () => {
  it('renders default field label', () => {
    const { container } = render(<FieldLabel id='id' label='label' />)

    expect(container).toMatchSnapshot()
  })

  describe('optional required variant', () => {
    it('renders label with optional mark', () => {
      const { queryByText } = render(<FieldLabel id='id' label='label' />)

      expect(queryByText('label (optional)')).toBeInTheDocument()
    })

    it('renders label without optional mark', () => {
      const { queryByText } = render(
        <FieldLabel id='id' label='label' required />
      )

      expect(queryByText('label (optional)')).not.toBeInTheDocument()
      expect(queryByText('label')).toBeInTheDocument()
    })
  })

  describe('asterisk required variant', () => {
    it('renders label without asterisk', () => {
      const { queryByText } = render(
        <Form.ConfigProvider value={{ requiredVariant: 'asterisk' }}>
          <FieldLabel id='id' label='label' />
        </Form.ConfigProvider>
      )

      expect(queryByText('*')).not.toBeInTheDocument()
    })

    it('renders label with asterisk', () => {
      const { queryByText } = render(
        <Form.ConfigProvider value={{ requiredVariant: 'asterisk' }}>
          <FieldLabel id='id' label='label' required />
        </Form.ConfigProvider>
      )

      expect(queryByText('*')).toBeInTheDocument()
    })
  })
})
