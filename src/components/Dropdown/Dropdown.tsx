import React, {
  forwardRef,
  useRef,
  useState,
  useContext,
  useMemo,
  ReactNode,
  HTMLAttributes
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { PopoverOrigin } from '@material-ui/core/Popover'
import RootRef from '@material-ui/core/RootRef'

import {
  StandardProps,
  SpacingType,
  spacingToEm,
  CompoundedComponentWithRef,
  PicassoComponentWithRef
} from '../Picasso'
import DropdownArrow from '../DropdownArrow'
import Popper from '../Popper'
import ClickAwayListener from '../ClickAwayListener'
import styles from './styles'

import Grow from '@material-ui/core/Grow'
import { PopperPlacementType } from '@material-ui/core/Popper'

import { Paper } from '..'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Anchor element that opens content on click */
  children: ReactNode
  /** Content element that opens when anchor is clicked */
  content: ReactNode
  /** Offset of content element relative to anchor element */
  offset?: {
    top?: SpacingType
    bottom?: SpacingType
    left?: SpacingType
    right?: SpacingType
  }
  /** DEPRECATED. Positioning of content menu relative to anchor */
  anchorOrigin?: PopoverOrigin
  /** DEPRECATED. Positioning of content menu relative to content */
  transformOrigin?: PopoverOrigin
  /** Position of the popper relative to the anchor */
  placement?: PopperPlacementType
  /** Disable auto focus of first item in list or item */
  disableAutoFocus?: boolean
  /** Disable close on generic close events */
  disableAutoClose?: boolean
  /** Callback invoked when component is opened */
  onOpen?(): void
  /** Callback invoked when component is closed */
  onClose?(): void
}

interface StaticProps {
  Arrow: typeof DropdownArrow
  useContext: () => ContextProps
}

interface ContextProps {
  close: () => void
}

const DropdownContext = React.createContext<ContextProps | null>(null)

function useDropdownContext() {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error(
      `Dropdown compound components cannot be rendered outside the Dropdown component`
    )
  }
  return context
}

// eslint-disable-next-line react/display-name
export const Dropdown = forwardRef<HTMLDivElement, Props>(function Dropdown(
  {
    classes,
    className,
    style,
    children,
    content,
    offset,
    transformOrigin,
    anchorOrigin,
    placement,
    disableAutoClose,
    disableAutoFocus,
    onOpen,
    onClose,
    ...rest
  },
  ref
) {
  if (anchorOrigin) {
    // eslint-disable-next-line no-console
    console.warn(
      'DEPRECATED in Dropdown: "anchorOrigin". To control popper position, please use "placement" and "offset" props.'
    )
  }
  if (transformOrigin) {
    // eslint-disable-next-line no-console
    console.warn(
      'DEPRECATED in Dropdown: "transformOrigin". To control popper position, please use "placement" and "offset" props.'
    )
  }

  const contentRef = useRef<HTMLElement>()

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | undefined>(
    undefined
  )

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
    onOpen!()
  }

  const toggleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isOpen) {
      close()
    } else {
      open(event)
    }
  }

  const handleContentKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault()
    }

    // Always close menu regardless of disableAutoClose
    if (event.key === 'Escape') {
      close({ force: true })
    }

    if (event.key === 'Enter') {
      close()
    }

    if (event.key === ' ') {
      close()
    }
  }

  const close = ({ force } = { force: false }) => {
    if (!force && disableAutoClose) {
      return
    }

    setAnchorEl(undefined)
    setIsOpen(false)
    onClose!()
  }

  const focus = () => {
    if (disableAutoFocus) {
      return
    }

    if (!contentRef || !contentRef.current) {
      return
    }

    const { firstChild } = contentRef.current
    // TODO: add focusable interface to Picasso.Menu and other components that expose focus
    // @ts-ignore

    if (firstChild && firstChild.focus) {
      // @ts-ignore
      return firstChild.focus()
    }

    if (contentRef.current.focus) {
      return contentRef.current.focus()
    }
  }

  const paperMargins = useMemo(
    () => ({
      ...(offset!.top && { marginTop: spacingToEm(offset!.top) }),
      ...(offset!.bottom && { marginBottom: spacingToEm(offset!.bottom) }),
      ...(offset!.left && { marginLeft: spacingToEm(offset!.left) }),
      ...(offset!.right && { marginRight: spacingToEm(offset!.right) })
    }),
    [offset]
  )

  // here you can expose other methods, states to child components
  const context = useMemo(
    () => ({
      close: () => close({ force: true })
    }),
    [close]
  )

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <div className={classes.anchor} onClick={toggleOpen}>
        {children}
      </div>

      <Popper
        className={classes.popper}
        open={isOpen}
        anchorEl={anchorEl}
        popperOptions={{
          onCreate: focus
        }}
        placement={placement}
        style={paperMargins}
        disablePortal
      >
        <ClickAwayListener onClickAway={() => close({ force: true })}>
          <Grow in={isOpen} appear>
            <Paper
              className={classes.content}
              onClick={() => close()}
              onKeyDown={handleContentKeyDown}
            >
              <DropdownContext.Provider value={context}>
                <RootRef rootRef={contentRef}>{content}</RootRef>
              </DropdownContext.Provider>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </div>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Dropdown.defaultProps = {
  disableAutoClose: false,
  disableAutoFocus: false,
  offset: {},
  onClose: () => {},
  onOpen: () => {},
  placement: 'bottom-end'
}

Dropdown.displayName = 'Dropdown'

Dropdown.Arrow = DropdownArrow
Dropdown.useContext = useDropdownContext

export default withStyles(styles)(Dropdown) as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
