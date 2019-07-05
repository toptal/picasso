import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  FunctionComponent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import RootRef from '@material-ui/core/RootRef'

import { StandardProps } from '../Picasso'
import Menu from '../Menu'
import styles from './styles'

export interface Props extends StandardProps {
  selectedIndex?: number | null
}

enum Direction {
  UP,
  DOWN
}

const ScrollMenu: FunctionComponent<Props> = ({
  selectedIndex,
  classes,
  children
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const firstItemRef = createRef<HTMLElement>()
  const [prevSelectedIndex, setPrevSelectedIndex] = useState(selectedIndex)

  const renderChildren = React.Children.map(children, (child, index) => {
    if (index === 0) {
      // hack to be able to set ref for Menu.Item
      // when we will move to MUI v4 we will be able
      // just set ref={firstItemRef} to the child
      return <RootRef rootRef={firstItemRef}>{child}</RootRef>
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

  return (
    <Menu className={classes.menu}>
      <div ref={menuRef} className={classes.scrollView}>
        {renderChildren}
      </div>
    </Menu>
  )
}

export default withStyles(styles)(ScrollMenu)
