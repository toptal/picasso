import type { ReactNode } from 'react'
import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './FieldRequirements'
import FieldRequirements from './FieldRequirements'
import type { FieldRequirement } from './types'

const renderFieldRequirements = function <TInputValue>(
  children: ReactNode,
  props: OmitInternalProps<Props<TInputValue>>
) {
  return render(
    <FieldRequirements<TInputValue> {...props}>{children}</FieldRequirements>
  )
}

const requirements: FieldRequirement<string>[] = [
  {
    message: 'At least one number',
    validator: (value: string) => /\d/.test(value),
    testIds: {
      root: 'requirement-1',
      defaultIcon: 'requirement-1-default-icon',
      successIcon: 'requirement-1-success-icon',
      errorIcon: 'requirement-1-error-icon',
    },
  },
  {
    message: 'At least one uppercase character',
    validator: (value: string) => /[A-Z]/.test(value),
    testIds: {
      root: 'requirement-2',
      defaultIcon: 'requirement-2-default-icon',
      successIcon: 'requirement-2-success-icon',
      errorIcon: 'requirement-2-error-icon',
    },
  },
]

describe('FieldRequirements', () => {
  it('default render', () => {
    const { getByTestId, rerender } = renderFieldRequirements(null, {
      requirements,
      open: true,
      value: 'asd',
      testIds: {
        root: 'root',
        gridContainer: 'grid-container',
      },
    })

    const gridContainer = getByTestId('grid-container')

    expect(gridContainer).toBeInTheDocument()

    const requirement1DefaultIcon = getByTestId('requirement-1-default-icon')
    const requirement2DefaultIcon = getByTestId('requirement-2-default-icon')

    expect(requirement1DefaultIcon).toBeVisible()
    expect(requirement2DefaultIcon).toBeVisible()

    rerender(
      <FieldRequirements open value='asd1' requirements={requirements} />
    )

    const requirement1SuccessIcon = getByTestId('requirement-1-success-icon')

    expect(requirement1DefaultIcon).not.toBeVisible()
    expect(requirement1SuccessIcon).toBeVisible()

    rerender(
      <FieldRequirements open value='asd1A' requirements={requirements} />
    )

    const requirement2SuccessIcon = getByTestId('requirement-2-success-icon')

    expect(requirement2DefaultIcon).not.toBeVisible()
    expect(requirement2SuccessIcon).toBeVisible()
  })

  it('renders error state', () => {
    const { getByTestId, rerender } = renderFieldRequirements(null, {
      requirements,
      open: true,
      error: true,
      value: 'asd',
      testIds: {
        root: 'root',
        gridContainer: 'grid-container',
      },
    })

    const gridContainer = getByTestId('grid-container')

    expect(gridContainer).toBeInTheDocument()

    const requirement1ErrorIcon = getByTestId('requirement-1-error-icon')
    const requirement2ErrorIcon = getByTestId('requirement-2-error-icon')

    expect(requirement1ErrorIcon).toBeVisible()
    expect(requirement2ErrorIcon).toBeVisible()

    rerender(
      <FieldRequirements open value='asd1' requirements={requirements} />
    )

    const requirement1SuccessIcon = getByTestId('requirement-1-success-icon')

    expect(requirement1ErrorIcon).not.toBeVisible()
    expect(requirement1SuccessIcon).toBeVisible()

    rerender(
      <FieldRequirements open value='asd1A' requirements={requirements} />
    )

    const requirement2SuccessIcon = getByTestId('requirement-2-success-icon')

    expect(requirement2ErrorIcon).not.toBeVisible()
    expect(requirement2SuccessIcon).toBeVisible()
  })
})
