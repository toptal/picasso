import { waitForElements } from '../helpers'

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

    if (item.nextSibling && item.nextSibling.nodeName == 'DIV') {
      componentChildren.push(item.nextSibling)
    }

    applyCategoryStyling(item)
    disableClickHandlers(item) // for future reference if we decide to get back to previous structure
    item.remove()
  })

  componentChildren.forEach(child => applyChildrenStyling(child))
}

export const scheduleWork = api => async () => {
  try {
    // wait for Sidebar menu to be rendered
    await waitForElements('section > a')
    await api.expandAll()

    const menuItems = await waitForElements('section > a')
    autoExpandMenu(menuItems)
  } catch (e) {
    console.warn('Can not find Picasso menu section items. Error: ', e)
  }
}
