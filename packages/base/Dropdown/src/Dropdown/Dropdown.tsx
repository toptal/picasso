import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'
import React, { forwardRef, useContext, useRef, useState } from 'react'
import Grow from '@material-ui/core/Grow'
import type { PopperPlacementType } from '@material-ui/core/Popper'
import type { PopperOptions } from 'popper.js'
import type { StandardProps } from '@toptal/picasso-shared'
import type {
  DeprecatedSpacingType,
  SpacingType,
} from '@toptal/picasso-provider'
import { makeResponsiveSpacingProps } from '@toptal/picasso-provider'
import { Popper } from '@toptal/picasso-popper'
import { Paper } from '@toptal/picasso-paper'
import { ClickAwayListener, noop } from '@toptal/picasso-utils'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { contentClass } from './styles'

type ContentOverflowType = 'scroll' | 'visible'

type StyleProps = {
  /** Control content element style */
  contentStyle?: {
    height?: string
    maxHeight?: string
  }
}

interface InternalProps
  extends StandardProps,
    HTMLAttributes<HTMLDivElement>,
    StyleProps {
  /** Anchor element that opens content on click */
  children: ReactNode
  /** Content element that opens when anchor is clicked */
  content: ReactNode
  /** The placement of the content element relative to anchor element. */
  placement?: PopperPlacementType
  /** Disabled */
  disabled?: boolean
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
  /** Sets styles for the inner wrapper */
  classes?: { popper?: string; content?: string }
}

type PropsWithBaseSpacing = InternalProps & {
  /** Offset of content element relative to anchor element */
  offset?: {
    top?: Exclude<SpacingType, DeprecatedSpacingType>
    bottom?: Exclude<SpacingType, DeprecatedSpacingType>
    left?: Exclude<SpacingType, DeprecatedSpacingType>
    right?: Exclude<SpacingType, DeprecatedSpacingType>
  }
}

type PropsWithDeprecatedSpacing = InternalProps & {
  /** Offset of content element relative to anchor element */
  /** @deprecated [FX-4438] use {@link @toptal/picasso-provider#PicassoSpacing} instead */
  offset?: {
    /** @deprecated [FX-4438] */
    top?: DeprecatedSpacingType
    /** @deprecated [FX-4438] */
    bottom?: DeprecatedSpacingType
    /** @deprecated [FX-4438] */
    left?: DeprecatedSpacingType
    /** @deprecated [FX-4438] */
    right?: DeprecatedSpacingType
  }
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

const useResponsiveProps = makeResponsiveSpacingProps(
  ['margin-top', 'margin-bottom', 'margin-left', 'margin-right'] as const,
  'PicassoDropdown-Responsive'
)

export type DropdownProps = {
  (
    props: PropsWithBaseSpacing & { ref?: Ref<HTMLDivElement> | null }
  ): ReactElement
  (
    props: PropsWithDeprecatedSpacing & { ref?: Ref<HTMLDivElement> | null }
  ): ReactElement
  displayName?: string
  defaultProps?: Partial<PropsWithBaseSpacing>
}

export type Props = PropsWithBaseSpacing | PropsWithDeprecatedSpacing

// eslint-disable-next-line react/display-name
export const Dropdown: DropdownProps = forwardRef<
  HTMLDivElement,
  PropsWithBaseSpacing | PropsWithDeprecatedSpacing
>(function Dropdown(props, ref) {
  const {
    className,
    style,
    children,
    content,
    offset,
    placement,
    disabled,
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

  const contentRef = useRef<HTMLDivElement>(null)
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

    if (firstChild && firstChild.firstChild?.focus) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return firstChild.firstChild.focus()
    }

    if (contentRef.current.focus) {
      return contentRef.current.focus()
    }
  }

  const { className: responsiveClasses, style: responsiveStyle } =
    useResponsiveProps({
      'margin-top': offset?.top,
      'margin-right': offset?.right,
      'margin-bottom': offset?.bottom,
      'margin-left': offset?.left,
    })

  const context = {
    close: () => forceClose(),
  }

  const handleClickAway = (event: MouseEvent | TouchEvent | FocusEvent) => {
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
      className={twMerge('flex items-center', className)}
      style={style}
    >
      <div
        className={twJoin(
          'inline-flex items-center',
          disabled ? 'pointer-events-none' : 'cursor-pointer'
        )}
        onClick={disabled ? () => {} : handleAnchorClick}
      >
        {typeof children === 'function' ? children({ isOpen }) : children}
      </div>

      {(isOpen || keepMounted) && (
        <Popper
          className={twJoin(
            'shadow-2',
            externalClasses?.popper,
            responsiveClasses
          )}
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
          style={{ ...responsiveStyle }}
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
                  className={twMerge(
                    contentOverflow === 'visible'
                      ? contentClass.contentVisible
                      : contentClass.content,
                    externalClasses?.content
                  )}
                  onKeyDown={handleContentKeyDown}
                  elevation={0}
                >
                  <DropdownContext.Provider value={context}>
                    <div ref={contentRef}>{content}</div>
                  </DropdownContext.Provider>
                </Paper>
              </Grow>
            </div>
          </ClickAwayListener>
        </Popper>
      )}
    </div>
  )
}) as DropdownProps

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
