import { ClickAwayListener } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import SelectListItem, {
  SelectListItemProps
} from '@toptal/picasso/SelectListItem'
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

export interface Props extends Omit<SelectListItemProps, 'nested'> {
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
  name: 'PicassoDrilldown'
})

export const DrilldownMenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function DrilldownItem (props) {
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
  const [currentKey] = useState(generateKey)
  const { menuKey, setMenuKey } = useContext(DrilldownMenuContext)
  const opened = currentKey === menuKey

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (menu && setMenuKey) {
        event.stopPropagation()
        setMenuKey(currentKey)
      }
      if (onClick) {
        onClick(event)
      }
    },
    [currentKey, menu, setMenuKey, onClick]
  )

  const handleAwayClick = useCallback(() => {
    if (setMenuKey) {
      setMenuKey(undefined)
    }
  }, [setMenuKey])

  return (
    <>
      <SelectListItem
        {...rest}
        ref={anchorRef}
        className={className}
        style={style}
        nested={Boolean(menu)}
        selected={opened || selected}
        onClick={handleItemClick}
      />
      {menu && opened && (
        <Popper
          className={classes.popper}
          anchorEl={anchorRef.current}
          placement='right'
          open
          autoWidth={false}
          enableCompactMode
          container={popperContainer}
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
