import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import { PopperPlacementType } from '@material-ui/core/Popper'
import { PopperOptions } from 'popper.js'
import RootRef from '@material-ui/core/RootRef'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  spacingToRem,
  SpacingType,
  StandardProps,
} from '@toptal/picasso-shared'

import Popper from '../Popper'
import Paper from '../Paper'
import styles, { StyleProps } from './styles'
import noop from '../utils/noop'

type ContentOverflowType = 'scroll' | 'visible'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLDivElement>,
    StyleProps {
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
  popperProps?: HTMLAttributes<HTMLDivElement>
  /** Always keep Popper's children in the DOM */
  keepMounted?: boolean
  /** Callback invoked when component is opened */
  onOpen?: () => void
  /** Callback invoked when component is closed */
  onClose?: () => void
  /** Sets the desired behavior for an element's overflow */
  contentOverflow?: ContentOverflowType
  popperContainer?: HTMLElement
}

export interface ContextProps {
  close: () => void
}

const DropdownContext = React.createContext<ContextProps | null>(null)

export const useDropdownContext = () => {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error(
      'Dropdown compound components cannot be rendered outside the Dropdown component'
    )
  }

  return context
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoDropdown',
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
    popperProps,
    keepMounted,
    onOpen = noop,
    popperContainer,
    onClose = noop,
    contentStyle,
    // Avoid passing external classes inside the rest props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: externalClasses,
    contentOverflow = 'scroll',
    ...rest
  } = props
  const classes = useStyles(props)

  const contentRef = useRef<HTMLElement>()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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

  const open = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
    onOpen()
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
    onClose()
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    if (firstChild && firstChild.focus) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return firstChild.focus()
    }

    if (contentRef.current.focus) {
      return contentRef.current.focus()
    }
  }

  const paperMargins = useMemo(() => {
    if (offset) {
      return {
        ...(offset.top && { marginTop: spacingToRem(offset.top) }),
        ...(offset.bottom && { marginBottom: spacingToRem(offset.bottom) }),
        ...(offset.left && { marginLeft: spacingToRem(offset.left) }),
        ...(offset.right && { marginRight: spacingToRem(offset.right) }),
      }
    }
  }, [offset])

  // here you can expose other methods, states to child components
  const context = {
    close: () => forceClose(),
  }

  const handleClickAway = (event: React.MouseEvent<Document>) => {
    const target = event.target

    const isAnchorTapEvent =
      anchorEl && target instanceof Node && anchorEl.contains(target)

    if (isAnchorTapEvent) {
      return
    }

    forceClose()
  }

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <div className={classes.anchor} onClick={handleAnchorClick}>
        {typeof children === 'function' ? children({ isOpen }) : children}
      </div>

      {(isOpen || keepMounted) && (
        <Popper
          className={classes.popper}
          anchorEl={anchorEl ?? null}
          popperOptions={{
            onCreate: focus,
            /*
            Fixes https://github.com/toptal/picasso/pull/2124#issuecomment-894341054
            When the anchor goes above the viewport, popper goes to infinite flipping.
            flipped: true -> flipped: false -> flipped: true -> ...
            */
            modifiers: { flip: { enabled: contentOverflow !== 'visible' } },
            ...popperOptions,
          }}
          placement={placement}
          style={paperMargins}
          disablePortal={disablePortal}
          keepMounted={keepMounted}
          autoWidth={false}
          open={isOpen}
          enableCompactMode
          container={popperContainer}
          {...popperProps}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            {/* TODO: Remove this extra markup and put the onClick handler on `Paper` element */}
            {/* as soon as https://github.com/mui-org/material-ui/issues/22156 gets fixed */}
            <div onClick={close}>
              <Grow in={isOpen} appear>
                <Paper
                  style={contentStyle}
                  className={cx(classes.content, {
                    [classes.contentVisible]: contentOverflow === 'visible',
                  })}
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
})

Dropdown.defaultProps = {
  disableAutoClose: false,
  disableAutoFocus: true,
  disablePortal: false,
  keepMounted: false,
  onClose: noop,
  onOpen: noop,
  placement: 'bottom-end',
  popperOptions: {},
}

Dropdown.displayName = 'Dropdown'

export default Dropdown
