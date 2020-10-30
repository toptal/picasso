import { waitForElements } from '../helpers'

const disableClickHandlers = item => {
  item.addEventListener('click', e => {
    e.stopPropagation()
    e.preventDefault()
  })
}

const removeCaret = item => {
  item.querySelector('.sidebar-expander').remove()
  item.querySelector('.sidebar-svg-icon').remove()
}

const applyChildrenStyling = child => {
  child.style = 'margin-bottom: 15px; margin-left: -15px'
}

const applyCategoryStyling = item => {
  item.style = `
    text-transform: uppercase;
    color: rgba(51,51,51,0.5);
    letter-spacing: 0.35em;
    line-height: 24px;
    padding-left: 20px;
    pointer-events:none;
    font-weight: 900;
    font-size: 11px;
  `
}

const expandAll = (menuItems, api) => {
  /*
  In v5 there is an api.expandAll() method. It emits STORIES_EXPAND_ALL event.
  The Treeview component is listening for this event and expands on event emit.
  Code: https://github.com/atanasster/storybook/blob/1112cd1e76c6fc73425342f2c5c8bfc621a4fe33/lib/ui/src/components/sidebar/treeview/treeview.js#L313

  In v6 there is still such a method. However, it's not listened by the new useExpanded hook.
  Code: https://github.com/storybookjs/storybook/blob/d7dd6588cab918914409d443a4c09f156ea5c4e8/lib/ui/src/components/sidebar/useExpanded.ts#L43

  That's why we need to click every item on by one and return to the initial one at the end.
  */

  const { path: initialPath } = api.getUrlState()

  menuItems.forEach(item => {
    item.click()

    removeCaret(item)

    if (item.nextSibling && item.nextSibling.nodeName == 'DIV') {
      applyChildrenStyling(item.nextSibling)
    }

    applyCategoryStyling(item)
    disableClickHandlers(item)
  })

  api.navigate(initialPath)
}

export const scheduleWork = api => async () => {
  try {
    const sidebarLinksSelector = 'section > a'
    const menuItems = await waitForElements(sidebarLinksSelector)

    expandAll(menuItems, api)
  } catch (e) {
    console.warn('Can not find Picasso menu section items. Error: ', e)
  }
}
