import { ClickAwayListener } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import MenuListItem, { MenuListItemProps } from '@toptal/picasso/MenuListItem'
import { OverridableComponent } from '@toptal/picasso-shared'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'

import styles from './styles'
import DrilldownMenuContext from '../DrilldownMenu/DrilldownMenuContext'

export type Props = Omit<MenuListItemProps, 'contentRef'>

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

const useStyles = makeStyles(styles, {
  name: 'PicassoDrilldownMenuItem'
})

export const DrilldownMenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function DrilldownItem (props, ref) {
  const { className, style, selected, menu, ...rest } = props

  const classes = useStyles()
  const anchorRef = useRef<HTMLElement>(null)
  const [currentItemKey] = useState(generateKey)
  const { activeItemKey, onMouseEnter, onClickAway } = useContext(
    DrilldownMenuContext
  )
  const opened = activeItemKey === currentItemKey

  const handleMouseEnter = useCallback(() => onMouseEnter?.(currentItemKey), [
    currentItemKey,
    onMouseEnter
  ])

  const handleClickAway = useCallback(() => onClickAway?.(currentItemKey), [
    currentItemKey,
    onClickAway
  ])

  return (
    <>
      <MenuListItem
        {...rest}
        ref={ref}
        className={className}
        style={style}
        menu={menu}
        selected={opened || selected}
        contentRef={anchorRef}
        onMouseEnter={handleMouseEnter}
      />
      {menu && opened && (
        <Popper
          anchorEl={anchorRef.current}
          placement='right-start'
          open
          autoWidth={false}
          enableCompactMode
          popperOptions={{
            modifiers: {
              offset: {
                offset: `-10px,6px`
              }
            }
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper className={classes.content}>{menu}</Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  )
})

export default DrilldownMenuItem
