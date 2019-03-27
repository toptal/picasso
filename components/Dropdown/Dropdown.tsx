import React, {
  CSSProperties,
  useState,
  useRef,
  ReactNode,
  ReactElement
} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Popover from '@material-ui/core/Popover'

import Grid from '../Grid'
import Item from '../DropdownItem'
import Placeholder from '../DropdownPlaceholder'

type WidthType = 'auto' | 'shrink'

interface Props {
  /** `Trigger` element which will fire `open` callback for dropdown to open */
  children: string | ReactNode
  /** Content of Dropdown  */
  content: ReactElement<any>
  /** Minimum width for the `Content` of `Dropdown` */
  width?: WidthType | string | undefined
  /** Custom styling applied to root component */
  style?: CSSProperties
  /** Shows dropdown as open by default */
  open?: boolean
  /** Disable portal rendering and renders `Content` directly to the DOM of `Trigger` */
  disablePortal?: boolean
}

type DropdownComponentProps = {
  Item: typeof Item
  Placeholder: typeof Placeholder
}

const getTriggerWidthStyle = (
  element: HTMLElement | null,
  calculationType: WidthType | string | undefined
) => {
  if (calculationType && calculationType !== 'shrink') {
    if (calculationType === 'auto' && element) {
      const rect = element.getBoundingClientRect()

      return { minWidth: rect.width }
    } else {
      return { minWidth: calculationType }
    }
  }

  return { minWidth: 'auto' }
}

export const Dropdown: React.FunctionComponent<Props> &
DropdownComponentProps = ({
  content,
  style,
  children,
  width,
  open,
  disablePortal
}) => {
  const trigger = useRef(null)
  const [isOpen, setOpen] = useState(!!open)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  let PlaceHolderComponent = children

  if (typeof children === 'string') {
    PlaceHolderComponent = <Placeholder>{children}</Placeholder>
  }

  const menuItems = React.cloneElement(content, { handleClose })

  return (
    <Grid alignItems='center' style={style} spacing={0}>
      <div ref={trigger} style={{ padding: '0.25em 0' }}>
        <ButtonBase onClick={handleOpen}>{PlaceHolderComponent}</ButtonBase>
      </div>

      <Popover
        open={isOpen}
        anchorEl={trigger.current}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        disablePortal={disablePortal}
      >
        <div style={getTriggerWidthStyle(trigger.current, width)}>
          {menuItems}
        </div>
      </Popover>
    </Grid>
  )
}

Dropdown.defaultProps = {
  disablePortal: false,
  open: false,
  width: 'auto'
}

Dropdown.displayName = 'Dropdown'

Dropdown.Item = Item
Dropdown.Placeholder = Placeholder

export default Dropdown
