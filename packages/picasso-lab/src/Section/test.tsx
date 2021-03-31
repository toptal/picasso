import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Section, { Props } from './Section'

const DEFAULT_HEADER_TEST_ID = 'header'
const DEFAULT_TITLE_TEST_ID = 'title'
const DEFAULT_SUBTITLE_TEST_ID = 'subtitle'
const DEFAULT_ACTIONS_TEST_ID = 'actions'

const DEFAULT_CONTENT_TEST_ID = 'content'

const renderSection = ({
  testIds = {
    header: DEFAULT_HEADER_TEST_ID,
    title: DEFAULT_TITLE_TEST_ID,
    subtitle: DEFAULT_SUBTITLE_TEST_ID,
    actions: DEFAULT_ACTIONS_TEST_ID
  },
  children = <div data-testid={DEFAULT_CONTENT_TEST_ID} />,
  ...rest
}: Partial<Props> = {}) =>
  render(
    <Section testIds={testIds} {...rest}>
      {children}
    </Section>
  )

describe('Section', () => {
  it('renders with title, subtitle, actions and content', () => {
    const { container, getByTestId } = renderSection({
      title: 'Title',
      subtitle: 'Subtitle',
      actions: 'Actions'
    })

    const title = getByTestId(DEFAULT_TITLE_TEST_ID)
    const subtitle = getByTestId(DEFAULT_SUBTITLE_TEST_ID)
    const actions = getByTestId(DEFAULT_ACTIONS_TEST_ID)

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Title')
    expect(subtitle).toBeInTheDocument()
    expect(subtitle).toHaveTextContent('Subtitle')
    expect(actions).toBeInTheDocument()
    expect(actions).toHaveTextContent('Actions')
    expect(getByTestId(DEFAULT_CONTENT_TEST_ID)).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('renders without header', () => {
    const { container, queryByTestId } = renderSection()

    expect(queryByTestId(DEFAULT_HEADER_TEST_ID)).not.toBeInTheDocument()
    expect(queryByTestId(DEFAULT_TITLE_TEST_ID)).not.toBeInTheDocument()
    expect(queryByTestId(DEFAULT_SUBTITLE_TEST_ID)).not.toBeInTheDocument()
    expect(queryByTestId(DEFAULT_ACTIONS_TEST_ID)).not.toBeInTheDocument()
    expect(queryByTestId(DEFAULT_CONTENT_TEST_ID)).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('renders with only title', () => {
    const { queryByTestId } = renderSection({ title: 'Title' })

    expect(queryByTestId(DEFAULT_HEADER_TEST_ID)).toBeInTheDocument()
    expect(queryByTestId(DEFAULT_TITLE_TEST_ID)).toBeInTheDocument()
    expect(queryByTestId(DEFAULT_SUBTITLE_TEST_ID)).not.toBeInTheDocument()
    expect(queryByTestId(DEFAULT_ACTIONS_TEST_ID)).not.toBeInTheDocument()
  })
})
