import React, { useState, useEffect, useRef, createRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import RootRef from '@material-ui/core/RootRef'
import Menu from '../Menu'
import styles from './styles'
var Direction
;(function (Direction) {
  Direction[(Direction['UP'] = 0)] = 'UP'
  Direction[(Direction['DOWN'] = 1)] = 'DOWN'
})(Direction || (Direction = {}))
const ScrollMenu = ({ selectedIndex, classes, children, style }) => {
  const menuRef = useRef(null)
  const firstItemRef = createRef()
  const [prevSelectedIndex, setPrevSelectedIndex] = useState(selectedIndex)
  const renderChildren = React.Children.map(children, (child, index) => {
    if (index === 0 && child) {
      return React.createElement(RootRef, { rootRef: firstItemRef }, child)
    }
    return child
  })
  useEffect(() => {
    if (!menuRef.current || !firstItemRef.current) {
      return
    }
    if (selectedIndex === undefined || selectedIndex === null) {
      return
    }
    const currentScrollTop = menuRef.current.scrollTop
    const itemHeight = firstItemRef.current.offsetHeight
    const scrollViewHeight = menuRef.current.offsetHeight
    const moveDirection =
      prevSelectedIndex && prevSelectedIndex <= selectedIndex
        ? Direction.DOWN
        : Direction.UP
    const countItemsOnScrollView = Math.floor(scrollViewHeight / itemHeight)
    const topVisibleItem = currentScrollTop / itemHeight
    const bottomVisibleItem = topVisibleItem + countItemsOnScrollView - 1
    const isHighlightedItemInScrollView =
      selectedIndex >= topVisibleItem && selectedIndex <= bottomVisibleItem
    if (!isHighlightedItemInScrollView) {
      let scrollTop = 0
      if (moveDirection === Direction.UP) {
        scrollTop = (selectedIndex - 1) * itemHeight
      } else if (moveDirection === Direction.DOWN) {
        scrollTop = (selectedIndex - countItemsOnScrollView + 1) * itemHeight
      }
      menuRef.current.scrollTop = scrollTop
    }
    setPrevSelectedIndex(selectedIndex)
  })
  return React.createElement(
    Menu,
    { className: classes.menu, style: style },
    React.createElement(
      'div',
      { ref: menuRef, className: classes.scrollView },
      renderChildren
    )
  )
}
export default withStyles(styles)(ScrollMenu)
//# sourceMappingURL=ScrollMenu.js.map
