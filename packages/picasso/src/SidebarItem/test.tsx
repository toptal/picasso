import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import { Candidates16 } from '../Icon'
import PageSidebar from '../PageSidebar'
import { Props } from './SidebarItem'

jest.mock('ap-style-title-case')

const TestSidebarItem = ({
  children,
  icon,
  selected,
  collapsible,
  titleCase,
  menu
}: OmitInternalProps<Props>) => {
  return (
    <PageSidebar.Item
      icon={icon}
      selected={selected}
      collapsible={collapsible}
      titleCase={titleCase}
      menu={menu}
    >
      {children}
    </PageSidebar.Item>
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('SidebarItem', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

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
      <PageSidebar.Menu>
        <PageSidebar.Item>Menu item</PageSidebar.Item>
      </PageSidebar.Menu>
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
      <PageSidebar>
        <PageSidebar.Menu>
          <PageSidebar.Item
            menu={
              <PageSidebar.Menu>
                <PageSidebar.Item selected>Menu item</PageSidebar.Item>
              </PageSidebar.Menu>
            }
            collapsible
          >
            Test item
          </PageSidebar.Item>
        </PageSidebar.Menu>
      </PageSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  it('collapsible menu is expanded when one of the children is selected and subMenu has a wrapper component', () => {
    const SubMenu = () => (
      <PageSidebar.Menu>
        <PageSidebar.Item selected>Menu item</PageSidebar.Item>
      </PageSidebar.Menu>
    )

    const { container } = render(
      <PageSidebar>
        <PageSidebar.Menu>
          <PageSidebar.Item menu={<SubMenu />} collapsible>
            Test item
          </PageSidebar.Item>
        </PageSidebar.Menu>
      </PageSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  it("don't use accordion for non-collapsible with menu", () => {
    const menu = (
      <PageSidebar.Menu>
        <PageSidebar.Item>Menu item</PageSidebar.Item>
      </PageSidebar.Menu>
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
      <PageSidebar.Menu>
        <PageSidebar.Item>{MENU_TEXT_CONTENT}</PageSidebar.Item>
      </PageSidebar.Menu>
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
      <PageSidebar.Menu>
        <PageSidebar.Item>{TEXT_CONTENT}</PageSidebar.Item>
      </PageSidebar.Menu>
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

  describe('when sidebar is collapsed', () => {
    it('hides content of the item', () => {
      const { getByTestId } = render(
        <Sidebar collapsible defaultCollapsed>
          <Sidebar.Menu>
            <Sidebar.Item icon={<Candidates16 data-testid='icon' />}>
              <span data-testid='text-content'>Menu item</span>
            </Sidebar.Item>
          </Sidebar.Menu>
        </Sidebar>
      )

      expect(getByTestId('icon')).toBeVisible()
      expect(getByTestId('text-content')).not.toBeVisible()
    })
  })
})
