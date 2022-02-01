import React from 'react'
import { render, TestingPicasso } from '@toptal/picasso/test-utils'

import Timeline, { Props } from './Timeline'

const renderTimeline = ({ children }: Props) =>
  render(
    <TestingPicasso>
      <Timeline>{children}</Timeline>
    </TestingPicasso>
  )

describe('Timeline', () => {
  it('renders', async () => {
    const { container, queryByText, queryAllByTestId } = renderTimeline({
      children: (
        <>
          <Timeline.Row testIds={{ dot: 'dot' }}>Row #1</Timeline.Row>
          <Timeline.Row testIds={{ dot: 'dot' }}>Row #2</Timeline.Row>
          <Timeline.Row testIds={{ dot: 'dot' }}>Row #3</Timeline.Row>
        </>
      )
    })

    expect(queryByText('Row #1')).toBeInTheDocument()
    expect(queryByText('Row #2')).toBeInTheDocument()
    expect(queryByText('Row #3')).toBeInTheDocument()

    expect(queryAllByTestId('dot')).toHaveLength(3)

    expect(container).toMatchSnapshot()
  })

  it('renders without a connector', async () => {
    const { container, queryAllByTestId } = renderTimeline({
      children: (
        <>
          <Timeline.Row testIds={{ dot: 'dot', connector: 'connector' }}>
            Row #1
          </Timeline.Row>
          <Timeline.Row testIds={{ dot: 'dot', connector: 'connector' }}>
            Row #2
          </Timeline.Row>
          <Timeline.Row
            testIds={{ dot: 'dot', connector: 'connector' }}
            hasConnector={false}
          >
            Row #3
          </Timeline.Row>
        </>
      )
    })

    expect(queryAllByTestId('dot')).toHaveLength(3)
    expect(queryAllByTestId('connector')).toHaveLength(2)

    expect(container).toMatchSnapshot()
  })

  it('renders with dates', async () => {
    const { container, queryByText } = renderTimeline({
      children: (
        <>
          <Timeline.Row date='25.06.2021'>Row #1</Timeline.Row>
          <Timeline.Row date='25.06.2022'>Row #2</Timeline.Row>
          <Timeline.Row date='25.06.2023'>Row #3</Timeline.Row>
        </>
      )
    })

    expect(queryByText('25.06.2021')).toBeInTheDocument()
    expect(queryByText('25.06.2022')).toBeInTheDocument()
    expect(queryByText('25.06.2023')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('renders with icons', async () => {
    const { container, queryByTestId } = renderTimeline({
      children: (
        <>
          <Timeline.Row icon={<span data-testid='icon-1' />}>
            Row #1
          </Timeline.Row>
          <Timeline.Row icon={<span data-testid='icon-2' />}>
            Row #2
          </Timeline.Row>
          <Timeline.Row icon={<span data-testid='icon-3' />}>
            Row #3
          </Timeline.Row>
        </>
      )
    })

    expect(queryByTestId('icon-1')).toBeInTheDocument()
    expect(queryByTestId('icon-2')).toBeInTheDocument()
    expect(queryByTestId('icon-3')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
