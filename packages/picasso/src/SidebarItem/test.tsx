import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import { Candidates16 } from '../Icon'
import Sidebar from '../Sidebar'
import { Props } from './SidebarItem'

jest.mock('ap-style-title-case')

const TestSidebarItem: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  icon,
  selected,
  collapsible,
  titleCase,
  menu
}) => (
  <Sidebar.Item
    icon={icon}
    selected={selected}
    collapsible={collapsible}
    titleCase={titleCase}
    menu={menu}
  >
    {children}
  </Sidebar.Item>
)

let spiedOnTitleCase: jest.SpyInstance

beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

describe('SidebarItem', () => {
  it('renders', () => {
    const { container } = render(<TestSidebarItem>Test item</TestSidebarItem>)

    expect(container).toMatchSnapshot()
  })

  it('with icon', () => {
    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />}>Test item</TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('is selected', () => {
    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />} selected>
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('use accordion for collapsible with menu', () => {
    const menu = (
      <Sidebar.Menu>
        <Sidebar.Item>Menu item</Sidebar.Item>
      </Sidebar.Menu>
    )

    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />} menu={menu} collapsible>
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('collapsible menu is expanded when one of the children is selected', () => {
    const { container } = render(
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item
            menu={
              <Sidebar.Menu>
                <Sidebar.Item selected>Menu item</Sidebar.Item>
              </Sidebar.Menu>
            }
            collapsible
          >
            Test item
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    )

    expect(container).toMatchSnapshot()
  })

  it('apply selected styles when subMenu has a wrapper component', () => {
    const SubMenu = () => (
      <Sidebar.Menu>
        <Sidebar.Item selected>Menu item</Sidebar.Item>
      </Sidebar.Menu>
    )

    const { container } = render(
      <TestSidebarItem
        icon={<Candidates16 />}
        menu={<SubMenu />}
        collapsible
        isExpanded
      >
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  it("don't use accordion for non-collapsible with menu", () => {
    const menu = (
      <Sidebar.Menu>
        <Sidebar.Item>Menu item</Sidebar.Item>
      </Sidebar.Menu>
    )

    const { container } = render(
      <TestSidebarItem icon={<Candidates16 />} menu={menu}>
        Test item
      </TestSidebarItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('should transform menu items text to title case when Picasso titleCase property is true', () => {
    const MENU_TEXT_CONTENT = 'Test vh5'
    const menu = (
      <Sidebar.Menu>
        <Sidebar.Item>{MENU_TEXT_CONTENT}</Sidebar.Item>
      </Sidebar.Menu>
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

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(2)
    expect(spiedOnTitleCase.mock.calls[0]).toEqual([SIDEBAR_ITEM_TEXT_CONTENT])
    expect(spiedOnTitleCase.mock.calls[1]).toEqual([MENU_TEXT_CONTENT])
  })

  it('should not transform menu items text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    const TEXT_CONTENT = 'Test vi7'
    const menu = (
      <Sidebar.Menu>
        <Sidebar.Item>{TEXT_CONTENT}</Sidebar.Item>
      </Sidebar.Menu>
    )

    render(
      <TestSidebarItem menu={menu} titleCase={false}>
        Abc 012
      </TestSidebarItem>,
      undefined,
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })
})
