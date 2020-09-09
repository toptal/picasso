import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import { Candidates16 } from '../Icon'
import SidebarMenu from '../SidebarMenu'
import Sidebar from '../Sidebar'
import SidebarItem, { Props } from './SidebarItem'

jest.mock('ap-style-title-case')

const TestSidebarItem: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  icon,
  selected,
  collapsible,
  titleCase,
  menu
}) => (
  <SidebarItem
    icon={icon}
    selected={selected}
    collapsible={collapsible}
    titleCase={titleCase}
    menu={menu}
  >
    {children}
  </SidebarItem>
)

let spiedOnTitleCase: jest.SpyInstance
beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

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
      <Sidebar>
        <SidebarMenu>
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
        </SidebarMenu>
      </Sidebar>
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

  test('should transform menu items text to title case when Picasso titleCase property is true', () => {
    const MENU_TEXT_CONTENT = 'Test vh5'
    const menu = (
      <SidebarMenu>
        <SidebarItem>{MENU_TEXT_CONTENT}</SidebarItem>
      </SidebarMenu>
    )

    const SIDEBAR_ITEM_TEXT_CONTENT = 'Test by2'
    render(
      <TestSidebarItem menu={menu}>
        {SIDEBAR_ITEM_TEXT_CONTENT}
      </TestSidebarItem>,
      undefined,
      {
        titleCase: true
      }
    )

    expect(spiedOnTitleCase).toBeCalledTimes(2)
    expect(spiedOnTitleCase.mock.calls[0]).toEqual([SIDEBAR_ITEM_TEXT_CONTENT])
    expect(spiedOnTitleCase.mock.calls[1]).toEqual([MENU_TEXT_CONTENT])
  })

  test('should not transform menu items text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    const TEXT_CONTENT = 'Test vi7'
    const menu = (
      <SidebarMenu>
        <SidebarItem>{TEXT_CONTENT}</SidebarItem>
      </SidebarMenu>
    )

    render(
      <TestSidebarItem menu={menu} titleCase={false}>
        Abc 012
      </TestSidebarItem>,
      undefined,
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
  })
})
