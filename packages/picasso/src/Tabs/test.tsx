import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { TestingPicasso } from '@toptal/picasso/test-utils'

import { TabProps } from '../Tab'
import Tabs, { Props } from './Tabs'

const renderTabContent = (tab: TabProps, index: number, value: any) => {
  const isTabActive = index + 1 === value || tab.value === value
  const testId = `tab-${index + 1}-content`

  if (isTabActive) {
    return (
      <div key={testId} data-testid={testId}>
        Tab #{index + 1} content
      </div>
    )
  }

  return null
}

const renderTabs = (
  tabs: TabProps[],
  { value, onChange }: OmitInternalProps<Props, 'children'>
) => {
  return render(
    <TestingPicasso>
      <Tabs onChange={onChange} value={value}>
        {tabs.map((tab, index) => (
          <Tabs.Tab
            key={String(index)}
            data-testid={`tab-${index + 1}`}
            value={tab.value}
            label={tab.label}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>

      {tabs.map((tab, index) => renderTabContent(tab, index, value))}
    </TestingPicasso>
  )
}

describe('Tabs', () => {
  it('renders', () => {
    const { container, queryByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2' }],
      {
        value: false
      }
    )

    expect(queryByTestId('tab-1-content')).not.toBeInTheDocument()
    expect(queryByTestId('tab-2-content')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('renders with a pre-selected option', () => {
    const { container, queryByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2' }],
      {
        value: 1
      }
    )

    expect(queryByTestId('tab-2-content')).not.toBeInTheDocument()
    expect(queryByTestId('tab-1-content')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('renders with a pre-selected option using custom value', () => {
    const { container, queryByTestId } = renderTabs(
      [
        { label: 'Tab 1', value: 'tab-1' },
        { label: 'Tab 2', value: 'tab-2' }
      ],
      {
        value: 'tab-1'
      }
    )

    expect(queryByTestId('tab-2-content')).not.toBeInTheDocument()
    expect(queryByTestId('tab-1-content')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('fires onChange when clicked', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2' }],
      {
        value: 1,
        onChange
      }
    )

    fireEvent.click(getByTestId('tab-2'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('doesnt fire onChange when disabled', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2', disabled: true }],
      {
        value: 1,
        onChange
      }
    )

    fireEvent.click(getByTestId('tab-2'))
    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
