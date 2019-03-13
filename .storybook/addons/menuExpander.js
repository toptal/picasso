import { STORY_RENDERED } from '@storybook/core-events'
import addons from '@storybook/addons'

import { waitForElement } from './utils'

const ADDON_ID = 'menu-expand'

const disableClickHandlers = item => {
  item.style = 'pointer-events: none; padding-left: 10px'

  // forbid event click handlers
  item.addEventListener('click', e => {
    e.stopPropagation()
    e.preventDefault()
  })
}

const removeCaret = item => {
  item.children[0].querySelector('span').remove()
}

const applyChildrenStyling = child => {
  child.style = 'margin-bottom: 15px; margin-left: -15px'
}

const applyCategoryStyling = item => {
  item.style = 'text-transform: uppercase;'
}

const autoExpandMenu = menuItems => {
  const componentChildren = []
  menuItems.forEach(item => {
    removeCaret(item)

    // click only not already expanded items
    if (!item.nextSibling || item.nextSibling.nodeName == 'A') {
      item.click()
    }

    if (item.nextSibling && item.nextSibling.nodeName == 'DIV') {
      componentChildren.push(item.nextSibling)
    }

    applyCategoryStyling(item)
    disableClickHandlers(item) // for future reference if we decide to get back to previous structure
    item.remove()
  })

  componentChildren.forEach(child => applyChildrenStyling(child))
}

const scheduleWork = async () => {
  const menuItems = await waitForElement('section > a')
  autoExpandMenu(menuItems)
}

addons.register(ADDON_ID, api => {
  api.on(STORY_RENDERED, scheduleWork)
})
