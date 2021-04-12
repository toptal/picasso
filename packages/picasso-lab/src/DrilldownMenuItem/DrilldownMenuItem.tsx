import { ClickAwayListener } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import SelectListItem, {
  SelectListItemProps
} from '@toptal/picasso/SelectListItem'
import { OverridableComponent } from '@toptal/picasso-shared'
import { useCombinedRefs } from '@toptal/picasso/utils'
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

export interface Props extends Omit<SelectListItemProps, 'arrow'> {
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
  const rootRef = useCombinedRefs(ref, anchorRef)
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
      <SelectListItem
        {...rest}
        ref={rootRef}
        className={className}
        style={style}
        arrow={Boolean(menu)}
        selected={opened || selected}
        onClick={handleItemClick}
      />
      {menu && opened && (
        <Popper
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
