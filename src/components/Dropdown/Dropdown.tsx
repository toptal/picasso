import React, {
  FunctionComponent,
  useRef,
  useState,
  useContext,
  useMemo,
  ReactNode
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Popover, { PopoverOrigin } from '@material-ui/core/Popover'
import RootRef from '@material-ui/core/RootRef'

import {
  StandardProps,
  SpacingType,
  spacingToEm,
  PicassoComponent
} from '../Picasso'
import DropdownArrow from '../DropdownArrow'
import styles from './styles'

export interface Props extends StandardProps {
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
  /** Positioning of content menu relative to anchor */
  anchorOrigin?: PopoverOrigin
  /** Positioning of content menu relative to content */
  transformOrigin?: PopoverOrigin
  /** Disable auto focus of first item in list or item */
  disableAutoFocus?: boolean
  /** Disable close on generic close events */
  disableAutoClose?: boolean
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

export const Dropdown: FunctionComponent<Props> & StaticProps = ({
  classes,
  className,
  style,
  children,
  content,
  offset,
  transformOrigin,
  anchorOrigin,
  disableAutoClose,
  disableAutoFocus
}) => {
  const contentRef = useRef<HTMLElement>()

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | undefined>(
    undefined
  )
  const open = Boolean(anchorEl)

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => setAnchorEl(event.currentTarget)

  const handlePopoverEntering = () => focus()

  const handlePopoverClose = (_: any, reason: string) => {
    // Always close menu regardless of disableAutoClose
    if (reason === 'backdropClick') {
      return close(true)
    }

    close()
  }

  const handleContentClick = () => {
    close()
  }

  const handleContentKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault()
    }

    // Always close menu regardless of disableAutoClose
    if (event.key === 'Escape') {
      close(true)
    }

    if (event.key === 'Enter') {
      close()
    }

    if (event.key === ' ') {
      close()
    }
  }

  const close = (force = false) => {
    if (!force && disableAutoClose) {
      return
    }

    setAnchorEl(undefined)
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
      close: () => close(true)
    }),
    [close]
  )

  return (
    <div className={cx(classes.root, className)} style={style}>
      <div className={classes.anchor} onClick={handleAnchorClick}>
        {children}
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        // MUI has a wrong typing for onClose prop without `reason` argument
        // @ts-ignore
        onClose={handlePopoverClose}
        onEntering={handlePopoverEntering}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        disableAutoFocus={disableAutoFocus}
        PaperProps={{
          style: { ...paperMargins },
          elevation: 2
        }}
      >
        <div
          className={classes.content}
          onClick={handleContentClick}
          onKeyDown={handleContentKeyDown}
        >
          <DropdownContext.Provider value={context}>
            <RootRef rootRef={contentRef}>{content}</RootRef>
          </DropdownContext.Provider>
        </div>
      </Popover>
    </div>
  )
}

Dropdown.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  disableAutoClose: false,
  disableAutoFocus: false,
  offset: {},
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right'
  }
}

Dropdown.displayName = 'Dropdown'

Dropdown.Arrow = DropdownArrow
Dropdown.useContext = useDropdownContext

export default withStyles(styles)(Dropdown) as PicassoComponent<
  Props,
  StaticProps
>
