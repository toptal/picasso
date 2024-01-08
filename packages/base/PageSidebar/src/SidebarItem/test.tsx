import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'
import { renderHook } from '@testing-library/react-hooks'
import { Candidates16 } from '@toptal/picasso-icons'

import PageSidebar from '../PageSidebar'
import type { Props } from './types'
import {
  SubMenuContextProvider,
  useSubMenuContext,
} from './SubMenuContextProvider'

jest.mock('ap-style-title-case')

const TestSidebarItem = ({
  children,
  icon,
  selected,
  collapsible,
  titleCase,
  menu,
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
        titleCase: true,
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
})

describe('SubMenuContextProvider', () => {
  describe('when no provider available', () => {
    it('returns `isSubMenu` as false', () => {
      const { result } = renderHook(() => useSubMenuContext())

      expect(result.current.isSubMenu).toBe(false)
    })
  })

  describe('when a provider available', () => {
    it('returns `isSubMenu` as true', () => {
      const { result } = renderHook(() => useSubMenuContext(), {
        wrapper: SubMenuContextProvider,
      })

      expect(result.current.isSubMenu).toBe(true)
    })
  })
})
