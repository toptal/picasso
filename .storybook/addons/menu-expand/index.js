import { waitForElements } from '../helpers'

const SIDEBAR_ITEM_SELECTOR = 'button.sidebar-item'
const SIDEBAR_ITEM_ICON_SELECTOR = `${SIDEBAR_ITEM_SELECTOR} > span`
const SIDEBAR_ITEM_EXPAND_ICON_SELECTOR = `${SIDEBAR_ITEM_SELECTOR} > svg`
const SIDEBAR_ITEM_EXPAND_ALL_ICON_SELECTOR = `button[data-action="expand-all"]`

const disableClickHandlers = item => {
  item.addEventListener('click', e => {
    e.stopPropagation()
    e.preventDefault()
  })
}

const removeIcons = item => {
  const icon = item.querySelector(SIDEBAR_ITEM_ICON_SELECTOR)
  icon && icon.remove()

  const expandIcon = item.querySelector(SIDEBAR_ITEM_EXPAND_ICON_SELECTOR)
  expandIcon && expandIcon.remove()

  const expandAllIcons = document.querySelectorAll(
    SIDEBAR_ITEM_EXPAND_ALL_ICON_SELECTOR
  )
  console.log(expandAllIcons)
  expandAllIcons.forEach(expandAllIcon => expandAllIcon.remove())
}

const applyChildrenStyles = child => {
  child.style = 'margin-bottom: 15px; margin-left: -15px'
}

const applyCategoryStyles = item => {
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

const applyStyles = menuItems => {
  menuItems.forEach(item => {
    removeIcons(item)

    if (item.nextSibling && item.nextSibling.nodeName == 'DIV') {
      applyChildrenStyles(item.nextSibling)
    }

    applyCategoryStyles(item)
    disableClickHandlers(item)
  })
}

export const scheduleWork = api => async () => {
  // Menu items can't be expanded in the current loop
  await new Promise(resolve => setTimeout(resolve))

  const menuItems = await waitForElements(SIDEBAR_ITEM_SELECTOR)
  api.expandAll()
  applyStyles(menuItems)
}
