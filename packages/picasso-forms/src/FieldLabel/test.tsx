import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FieldLabel from './FieldLabel'

describe('FieldLabel', () => {
  it('renders default field label', () => {
    const { container } = render(<FieldLabel name='name' label='label' />)

    expect(container).toMatchSnapshot()
  })

  describe('optional required variant', () => {
    it('renders label with optional mark', () => {
      const { queryByText } = render(<FieldLabel name='name' label='label' />)

      expect(queryByText('label (optional)')).toBeInTheDocument()
    })

    it('renders label without optional mark', () => {
      const { queryByText } = render(
        <FieldLabel name='name' label='label' required />
      )

      expect(queryByText('label (optional)')).not.toBeInTheDocument()
      expect(queryByText('label')).toBeInTheDocument()
    })
  })
})
