import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import MenuListItem, { MenuListItemProps } from '../MenuListItem'

const TestMenuListItem = (props?: MenuListItemProps) => {
  return <MenuListItem {...props} />
}

describe('MenuListItem', () => {
  it('renders', () => {
    const { container } = render(<TestMenuListItem />)

    expect(container).toMatchSnapshot()
  })

  it('renders checkmarked', () => {
    const { container } = render(<TestMenuListItem checkmarked />)

    expect(container).toMatchSnapshot()
  })

  it('renders with title', () => {
    const title = 'item'
    const { container } = render(<TestMenuListItem>{title}</TestMenuListItem>)

    expect(container).toMatchSnapshot()
  })

  it('renders with title and the global title case option', () => {
    const title = 'item'
    const config = { titleCase: true }
    const { container } = render(
      <TestMenuListItem>{title}</TestMenuListItem>,
      undefined,
      config
    )

    expect(container).toMatchSnapshot()
  })

  it('renders with title and the local title case option', () => {
    const title = 'item'
    const config = { titleCase: false }
    const { container } = render(
      <TestMenuListItem titleCase>{title}</TestMenuListItem>,
      undefined,
      config
    )

    expect(container).toMatchSnapshot()
  })

  it('renders with menu arrow', () => {
    const { container } = render(<TestMenuListItem menu={<div />} />)

    expect(container).toMatchSnapshot()
  })

  it('renders with description', () => {
    const { queryByTestId } = render(
      <TestMenuListItem description={<div data-testid='description' />} />
    )

    expect(queryByTestId('description')).toBeInTheDocument()
  })
})
