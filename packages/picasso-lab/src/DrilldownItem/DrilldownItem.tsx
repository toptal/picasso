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
import DrilldownContext from '../Drilldown/DrilldownContext'

export interface Props extends Omit<SelectListItemProps, 'nested'> {
  /** Nested drilldown */
  drilldown?: ReactElement
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

const DrilldownItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function DrilldownItem(props, ref) {
  const {
    className,
    style,
    selected,
    drilldown,
    popperContainer,
    onClick,
    ...rest
  } = props
  const classes = useStyles()
  const anchorRef = useRef<HTMLElement>(null)
  const [currentKey] = useState(generateKey)
  const { focusedKey, setFocusedKey } = useContext(DrilldownContext)
  const focused = currentKey === focusedKey

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (drilldown && setFocusedKey) {
        event.stopPropagation()
        setFocusedKey(currentKey)
      }
      if (onClick) {
        onClick(event)
      }
    },
    [currentKey, drilldown, setFocusedKey, onClick]
  )

  const handleAwayClick = useCallback(() => {
    if (setFocusedKey) {
      setFocusedKey(undefined)
    }
  }, [setFocusedKey])

  return (
    <>
      <SelectListItem
        {...rest}
        ref={anchorRef}
        className={className}
        style={style}
        nested={Boolean(drilldown)}
        selected={focused || selected}
        onClick={handleItemClick}
      />
      {drilldown && focused && (
        <Popper
          className={classes.popper}
          anchorEl={anchorRef.current}
          placement='right'
          open
          autoWidth
          enableCompactMode
          container={popperContainer}
        >
          <ClickAwayListener onClickAway={handleAwayClick}>
            <Paper className={classes.content}>
              {drilldown}
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  )
})

export default DrilldownItem
