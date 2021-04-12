import { makeStyles } from '@material-ui/core/styles'
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
>(function DrilldownItem (props, ref) {
  const {
    className,
    style,
    drilldown,
    popperContainer,
    onClick,
    ...rest
  } = props
  const classes = useStyles()
  const anchorRef = useRef<HTMLElement>(null)
  const [currentKey] = useState(generateKey)
  const { selectedKey, setSelectedKey } = useContext(DrilldownContext)
  const selected = currentKey === selectedKey

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (setSelectedKey) {
        setSelectedKey(currentKey)
      }
      if (onClick) {
        onClick(event)
      }
    },
    [currentKey, setSelectedKey, onClick]
  )

  return (
    <>
      <SelectListItem
        {...rest}
        ref={ref}
        className={className}
        style={style}
        nested={Boolean(drilldown)}
        onClick={handleClick}
      />
      <Popper
        className={classes.popper}
        open={selected}
        anchorEl={anchorRef.current}
        autoWidth
        enableCompactMode
        container={popperContainer}
      >
        {drilldown}
      </Popper>
    </>
  )
})

export default DrilldownItem
