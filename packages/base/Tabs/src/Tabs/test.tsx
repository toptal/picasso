/* eslint-disable react/no-array-index-key */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TestingPicasso } from '@toptal/picasso-test-utils'

import type { TabProps } from '../Tab'
import type { Props, TabsValueType } from './Tabs'
import { TabsCompound as Tabs } from '../TabsCompound'

const renderTabContent = (
  tab: TabProps,
  index: number,
  value: TabsValueType
) => {
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
  { value, onChange, variant }: Omit<Props<TabsValueType>, 'children'>,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
) => {
  return render(
    <TestingPicasso>
      <Tabs
        onChange={onChange}
        value={value}
        orientation={orientation}
        variant={variant}
      >
        {tabs.map((tab, index) => (
          <Tabs.Tab
            key={index}
            data-testid={`tab-${index + 1}`}
            value={tab.value}
            label={tab.label}
            disabled={tab.disabled}
            onClick={tab.onClick}
          />
        ))}
      </Tabs>

      {tabs.map((tab, index) => renderTabContent(tab, index, value))}
    </TestingPicasso>
  )
}

const ControlledTabs = ({
  tabs,
  initialValue,
  onChange,
}: {
  tabs: TabProps[]
  initialValue: TabsValueType
  onChange?: (event: React.ChangeEvent<{}> | null, value: TabsValueType) => void
}) => {
  const [value, setValue] = React.useState<TabsValueType>(initialValue)

  return (
    <TestingPicasso>
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          onChange?.(event, newValue)
        }}
      >
        {tabs.map((tab, index) => (
          <Tabs.Tab
            key={index}
            data-testid={`tab-${index + 1}`}
            value={tab.value}
            label={tab.label}
            disabled={tab.disabled}
            onClick={tab.onClick}
          />
        ))}
      </Tabs>
    </TestingPicasso>
  )
}

describe('Tabs', () => {
  it('renders', () => {
    const { container, queryByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2' }],
      {
        value: null,
      }
    )

    expect(queryByTestId('tab-1-content')).not.toBeInTheDocument()
    expect(queryByTestId('tab-2-content')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('renders in vertical orientation', () => {
    const { container } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2' }],
      { value: null },
      'vertical'
    )

    expect(container).toMatchSnapshot()
  })

  it('renders with a pre-selected option', () => {
    const { container, queryByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2' }],
      {
        value: 1,
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
        { label: 'Tab 2', value: 'tab-2' },
      ],
      {
        value: 'tab-1',
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
        value: 0,
        onChange,
      }
    )

    fireEvent.click(getByTestId('tab-2'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('fires onChange with custom value when clicked', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderTabs(
      [
        { label: 'Tab 1', value: 'first' },
        { label: 'Tab 2', value: 'second' },
      ],
      {
        value: 'first',
        onChange,
      }
    )

    fireEvent.click(getByTestId('tab-2'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'second')
  })

  it('doesnt fire onChange when disabled', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2', disabled: true }],
      {
        value: 1,
        onChange,
      }
    )

    fireEvent.click(getByTestId('tab-2'))
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  it('renders in full width', () => {
    const { container } = renderTabs([{ label: 'Tab 1' }, { label: 'Tab 2' }], {
      value: null,
      variant: 'fullWidth',
    })

    expect(container).toMatchSnapshot()
  })

  it('does not fire Tab onClick when the tab is disabled', () => {
    const onClick = jest.fn()
    const { getByTestId } = renderTabs(
      [{ label: 'Tab 1' }, { label: 'Tab 2', disabled: true, onClick }],
      { value: 0 }
    )

    fireEvent.click(getByTestId('tab-2'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not fire onChange when re-clicking the already-selected tab', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <ControlledTabs
        tabs={[{ label: 'Tab 1' }, { label: 'Tab 2' }]}
        initialValue={0}
        onChange={onChange}
      />
    )

    fireEvent.click(getByTestId('tab-1'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('fires onChange only once on double-click of an unselected tab', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <ControlledTabs
        tabs={[{ label: 'Tab 1' }, { label: 'Tab 2' }]}
        initialValue={0}
        onChange={onChange}
      />
    )

    fireEvent.click(getByTestId('tab-2'))
    fireEvent.click(getByTestId('tab-2'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 1)
  })

  it('fires Tab onClick on every click, including re-click of the selected tab', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ControlledTabs
        tabs={[{ label: 'Tab 1', onClick }, { label: 'Tab 2' }]}
        initialValue={0}
      />
    )

    fireEvent.click(getByTestId('tab-1'))
    fireEvent.click(getByTestId('tab-1'))
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('fires Tab onClick twice on double-click of an unselected tab', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ControlledTabs
        tabs={[{ label: 'Tab 1' }, { label: 'Tab 2', onClick }]}
        initialValue={0}
      />
    )

    fireEvent.click(getByTestId('tab-2'))
    fireEvent.click(getByTestId('tab-2'))
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('fires Tab onClick twice but does not fire onChange on double-click of selected tab', () => {
    const onChange = jest.fn()
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ControlledTabs
        tabs={[{ label: 'Tab 1', onClick }, { label: 'Tab 2' }]}
        initialValue={0}
        onChange={onChange}
      />
    )

    fireEvent.click(getByTestId('tab-1'))
    fireEvent.click(getByTestId('tab-1'))
    expect(onClick).toHaveBeenCalledTimes(2)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('fires Tab onClick on every click but Tabs onChange only on value change', () => {
    const onChange = jest.fn()
    const onClickTab1 = jest.fn()
    const onClickTab2 = jest.fn()
    const { getByTestId } = render(
      <ControlledTabs
        tabs={[
          { label: 'Tab 1', onClick: onClickTab1 },
          { label: 'Tab 2', onClick: onClickTab2 },
        ]}
        initialValue={0}
        onChange={onChange}
      />
    )

    fireEvent.click(getByTestId('tab-1'))
    fireEvent.click(getByTestId('tab-1'))
    fireEvent.click(getByTestId('tab-2'))
    fireEvent.click(getByTestId('tab-2'))

    expect(onClickTab1).toHaveBeenCalledTimes(2)
    expect(onClickTab2).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 1)
  })
})
