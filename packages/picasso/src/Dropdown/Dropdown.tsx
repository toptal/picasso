import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import { PopperPlacementType } from '@material-ui/core/Popper'
import { PopperOptions } from 'popper.js'
import RootRef from '@material-ui/core/RootRef'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  CompoundedComponentWithRef,
  PicassoComponentWithRef,
  spacingToRem,
  SpacingType,
  StandardProps,
  JssProps
} from '@toptal/picasso-shared'

import DropdownArrow from '../DropdownArrow'
import Popper from '../Popper'
import Paper from '../Paper'
import styles from './styles'

export interface Props
  extends StandardProps,
    JssProps,
    HTMLAttributes<HTMLDivElement> {
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
  placement?: PopperPlacementType
  /** Disable auto focus of first item in list or item */
  disableAutoFocus?: boolean
  /** Disable close on generic close events */
  disableAutoClose?: boolean
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
  disablePortal?: boolean
  popperOptions?: PopperOptions
  /** Callback invoked when component is opened */
  onOpen?(): void
  /** Callback invoked when component is closed */
  onClose?(): void
  popperContainer?: HTMLElement
}

export interface StaticProps {
  Arrow: typeof DropdownArrow
  useContext: () => ContextProps
}

interface ContextProps {
  close: () => void
}

const DropdownContext = React.createContext<ContextProps | null>(null)

const useDropdownContext = () => {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error(
      'Dropdown compound components cannot be rendered outside the Dropdown component'
    )
  }

  return context
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDropdown'
})

// eslint-disable-next-line react/display-name
export const Dropdown = forwardRef<HTMLDivElement, Props>(function Dropdown(
  props,
  ref
) {
  const {
    className,
    style,
    children,
    content,
    offset,
    placement,
    disableAutoClose,
    disableAutoFocus,
    disablePortal,
    popperOptions,
    onOpen,
    popperContainer,
    onClose,
    ...rest
  } = props
  const classes = useStyles()

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
      forceClose()
    }

    if (event.key === 'Enter') {
      close()
    }

    if (event.key === ' ') {
      close()
    }
  }

  const close = () => {
    if (disableAutoClose) {
      return
    }
    forceClose()
  }

  const forceClose = () => {
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
      ...(offset!.top && { marginTop: spacingToRem(offset!.top) }),
      ...(offset!.bottom && { marginBottom: spacingToRem(offset!.bottom) }),
      ...(offset!.left && { marginLeft: spacingToRem(offset!.left) }),
      ...(offset!.right && { marginRight: spacingToRem(offset!.right) })
    }),
    [offset]
  )

  // here you can expose other methods, states to child components
  const context = {
    close: () => forceClose()
  }

  const handleClickAway = (event: React.MouseEvent<Document>) => {
    const target = event.target

    if (anchorEl && target instanceof Node && anchorEl.contains(target)) {
      return
    }

    forceClose()
  }

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

      {anchorEl && (
        <Popper
          className={classes.popper}
          open={isOpen}
          anchorEl={anchorEl}
          popperOptions={{
            onCreate: focus,
            ...popperOptions
          }}
          placement={placement}
          style={paperMargins}
          disablePortal={disablePortal}
          autoWidth={false}
          enableCompactMode
          container={popperContainer}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            {/* TODO: Remove this extra markup and put the onClick handler on `Paper` element */}
            {/* as soon as https://github.com/mui-org/material-ui/issues/22156 gets fixed */}
            <div onClick={close}>
              <Grow in={isOpen} appear>
                <Paper
                  className={classes.content}
                  onKeyDown={handleContentKeyDown}
                  elevation={2}
                >
                  <DropdownContext.Provider value={context}>
                    <RootRef rootRef={contentRef}>{content}</RootRef>
                  </DropdownContext.Provider>
                </Paper>
              </Grow>
            </div>
          </ClickAwayListener>
        </Popper>
      )}
    </div>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Dropdown.defaultProps = {
  disableAutoClose: false,
  disableAutoFocus: true,
  disablePortal: false,
  offset: {},
  onClose: () => {},
  onOpen: () => {},
  placement: 'bottom-end',
  popperOptions: {}
}

Dropdown.displayName = 'Dropdown'

Dropdown.Arrow = DropdownArrow
Dropdown.useContext = useDropdownContext

export default Dropdown as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
