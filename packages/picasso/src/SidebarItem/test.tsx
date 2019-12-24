import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import { Candidates16 } from '../Icon'
import SidebarMenu from '../SidebarMenu'
import Sidebar from '../Sidebar'
import SidebarItem, { Props } from './SidebarItem'

const TestSidebarItem: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  icon,
  selected,
  collapsible,
  menu
}) => (
  <Picasso loadFonts={false}>
    <SidebarItem
      icon={icon}
      selected={selected}
      collapsible={collapsible}
      menu={menu}
    >
      {children}
    </SidebarItem>
  </Picasso>
)

describe('SidebarItem', () => {
  test('default render', () => {
    const { container } = render(<TestSidebarItem>Test item</TestSidebarItem>)

    expect(container).toMatchSnapshot()
  })

  test('with icon', () => {
    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />}>Test item</TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  test('is selected', () => {
    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />} selected>
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  test('use accordion for collapsible with menu', () => {
    const menu = (
      <SidebarMenu>
        <SidebarItem>Menu item</SidebarItem>
      </SidebarMenu>
    )

    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />} menu={menu} collapsible>
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  test('collapsible menu is expanded when one of the children is selected', () => {
    const { container } = render(
      <Picasso>
        <Sidebar>
          <SidebarItem
            menu={
              <SidebarMenu>
                <SidebarItem selected>Menu item</SidebarItem>
              </SidebarMenu>
            }
            collapsible
          >
            Test item
          </SidebarItem>
        </Sidebar>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test("don't use accordion for non-collapsible with menu", () => {
    const menu = (
      <SidebarMenu>
        <SidebarItem>Menu item</SidebarItem>
      </SidebarMenu>
    )

    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />} menu={menu}>
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })
})
