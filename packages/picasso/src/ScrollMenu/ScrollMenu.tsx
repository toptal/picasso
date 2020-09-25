import React, {
  useLayoutEffect,
  useRef,
  createRef,
  FunctionComponent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import RootRef from '@material-ui/core/RootRef'
import { StandardProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import styles from './styles'

export interface Props extends StandardProps {
  selectedIndex?: number | null
}

enum Direction {
  UP,
  DOWN
}

const getMoveDirection = (
  selectedIndex: number,
  prevSelectedIndex: number | null | undefined,
  bottomVisibleItem: number
) => {
  if (prevSelectedIndex != null) {
    return prevSelectedIndex <= selectedIndex ? Direction.DOWN : Direction.UP
  }

  return selectedIndex === Math.ceil(bottomVisibleItem)
    ? Direction.DOWN
    : Direction.UP
}

const preventDefault = (
  event: React.MouseEvent<HTMLUListElement, MouseEvent>
) => event.preventDefault()

const ScrollMenu: FunctionComponent<Props> = ({
  selectedIndex,
  classes,
  children,
  style
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const firstItemRef = createRef<HTMLElement>()
  const prevSelectedIndex = useRef(selectedIndex)

  const renderChildren = React.Children.map(children, (child, index) => {
    if (index === 0 && child) {
      return <RootRef rootRef={firstItemRef}>{child}</RootRef>
    }

    return child
  })

  useLayoutEffect(() => {
    if (!menuRef.current || !firstItemRef.current) {
      return
    }

    if (selectedIndex === undefined || selectedIndex === null) {
      return
    }

    const currentScrollTop = menuRef.current.scrollTop
    const itemHeight = firstItemRef.current.offsetHeight
    const scrollViewHeight = menuRef.current.offsetHeight

    const countItemsOnScrollView = scrollViewHeight / itemHeight
    const topVisibleItem = currentScrollTop / itemHeight
    const bottomVisibleItem = topVisibleItem + countItemsOnScrollView - 1

    const isHighlightedItemInScrollView =
      selectedIndex >= topVisibleItem && selectedIndex <= bottomVisibleItem

    if (!isHighlightedItemInScrollView) {
      const moveDirection = getMoveDirection(
        selectedIndex,
        prevSelectedIndex.current,
        bottomVisibleItem
      )
      let scrollTop = 0

      if (moveDirection === Direction.UP) {
        scrollTop = selectedIndex * itemHeight
      } else if (moveDirection === Direction.DOWN) {
        scrollTop = (selectedIndex - countItemsOnScrollView + 1) * itemHeight
      }

      menuRef.current.scrollTop = scrollTop
    }

    prevSelectedIndex.current = selectedIndex
  }, [firstItemRef, selectedIndex, prevSelectedIndex])

  return (
    <Menu className={classes.menu} style={style} onMouseDown={preventDefault}>
      <div ref={menuRef} className={classes.scrollView}>
        {renderChildren}
      </div>
    </Menu>
  )
}

export default withStyles(styles)(ScrollMenu)
