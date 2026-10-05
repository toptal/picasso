import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import InputIconAdornment from './InputIconAdornment'

const renderIconAdornment = (icon: React.ReactNode) =>
  render(<InputIconAdornment position='start' icon={icon} />)

describe('InputIconAdornment', () => {
  it('styles the icon it is given', () => {
    const { getByTestId } = renderIconAdornment(<span data-testid='icon' />)

    expect(getByTestId('icon')).toHaveClass('grow', 'shrink', 'basis-0')
    expect(getByTestId('icon')).toHaveAttribute('role', 'presentation')
  })

  it('renders a Fragment icon as it is', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    try {
      const { getByText } = renderIconAdornment(<>%</>)

      expect(getByText('%')).toBeInTheDocument()
      // React 19 logs an error for each prop a Fragment receives
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      consoleError.mockRestore()
    }
  })
})
