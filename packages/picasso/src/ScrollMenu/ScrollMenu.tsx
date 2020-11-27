import React, {
  useLayoutEffect,
  useRef,
  createRef,
  FunctionComponent,
  ReactNode
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import RootRef from '@material-ui/core/RootRef'
import { StandardProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import styles from './styles'

type FocusEventType = (event: React.FocusEvent<HTMLInputElement>) => void
export interface Props extends StandardProps {
  selectedIndex?: number | null
  onBlur?: FocusEventType
  fixedHeader?: ReactNode
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

const ScrollMenu: FunctionComponent<Props> = ({
  selectedIndex,
  onBlur,
  classes,
  children,
  style,
  fixedHeader,
  ...rest
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
    <Menu
      className={classes.menu}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {fixedHeader}
      <div ref={menuRef} className={classes.scrollView} onBlur={onBlur}>
        {renderChildren}
      </div>
    </Menu>
  )
}

export default withStyles(styles)(ScrollMenu)
