/* eslint-disable import/no-extraneous-dependencies */
import PageTopBar from '@toptal/picasso-page-top-bar'
import TopBarMenu from '@toptal/picasso-top-bar-menu'
import TopBarItem from '@toptal/picasso-top-bar-item'

export const PageTopBarCompound = Object.assign(PageTopBar, {
  Menu: TopBarMenu,
  Item: TopBarItem,
})
