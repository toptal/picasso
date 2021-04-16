import { ClickAwayListener } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import MenuListItem, { MenuListItemProps } from '@toptal/picasso/MenuListItem'
import { OverridableComponent } from '@toptal/picasso-shared'
import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'

import styles from './styles'
import DrilldownMenuContext from '../DrilldownMenu/DrilldownMenuContext'

export interface Props extends Omit<MenuListItemProps, 'arrow' | 'anchorRef'> {
  /** Nested menu */
  menu?: ReactElement
  /** Container for the the nested drilldown */
  popperContainer?: HTMLElement
}

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
  const {
    className,
    style,
    selected,
    menu,
    popperContainer,
    onClick,
    ...rest
  } = props

  const classes = useStyles()
  const anchorRef = useRef<HTMLElement>(null)
  const [currentMenuKey] = useState(generateKey)
  const { activeMenuKey, setActiveMenuKey } = useContext(DrilldownMenuContext)
  const opened = activeMenuKey === currentMenuKey

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (menu && setActiveMenuKey) {
        event.stopPropagation()
        setActiveMenuKey(currentMenuKey)
      }
      if (onClick) {
        onClick(event)
      }
    },
    [currentMenuKey, menu, setActiveMenuKey, onClick]
  )

  const handleAwayClick = useCallback(() => {
    if (setActiveMenuKey) {
      setActiveMenuKey(undefined)
    }
  }, [setActiveMenuKey])

  return (
    <>
      <MenuListItem
        {...rest}
        ref={ref}
        className={className}
        style={style}
        arrow={Boolean(menu)}
        selected={opened || selected}
        anchorRef={anchorRef}
        onClick={handleItemClick}
      />
      {menu && opened && (
        <Popper
          anchorEl={anchorRef.current}
          placement='right-start'
          open
          autoWidth={false}
          enableCompactMode
          container={popperContainer}
          popperOptions={{
            modifiers: {
              offset: {
                offset: `-10px,6px`
              }
            }
          }}
        >
          <ClickAwayListener onClickAway={handleAwayClick}>
            <Paper className={classes.content}>{menu}</Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  )
})

export default DrilldownMenuItem
