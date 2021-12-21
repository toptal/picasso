import React, {
  forwardRef,
  ReactNode,
  useContext,
  useLayoutEffect
} from 'react'
import cx from 'classnames'
import MUIPopper from '@material-ui/core/Popper'
import { Theme, makeStyles } from '@material-ui/core/styles'
import PopperJs, { ReferenceObject, PopperOptions } from 'popper.js'
import { BaseProps } from '@toptal/picasso-shared'
import { usePicassoRoot, useBreakpoint } from '@toptal/picasso-provider'
import ModalContext from '@toptal/picasso/Modal/ModalContext'

import useWidthOf from '../utils/use-width-of'
import styles from './styles'

export type PopperPlacementType =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'

export interface Props extends BaseProps {
  children?: ReactNode
  /** if true, the popper is visible */
  open: boolean
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy */
  disablePortal?: boolean
  /** Popper placement */
  placement?: PopperPlacementType
  /** Options provided to the popper.js instance */
  popperOptions?: PopperOptions
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the picasso root node
   */
  container?: HTMLElement | (() => HTMLElement)
  /**
   * HTML Element instance or a referenceObject
   * https://popper.js.org/popper-documentation.html#referenceObject
   */
  anchorEl: null | ReferenceObject | (() => ReferenceObject)
  /** Popper automatically resize to anchor element width */
  autoWidth?: boolean
  /** Popper width */
  width?: string
  /** Take full window width on small and medium screens */
  enableCompactMode?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoPopper' })

const getAnchorEl = (
  anchorEl: null | ReferenceObject | (() => ReferenceObject)
) => (typeof anchorEl === 'function' ? anchorEl() : anchorEl)

export const getPopperOptions = (
  popperOptions: PopperOptions,
  isInsideModal: boolean
) => ({
  ...popperOptions,

  modifiers: {
    ...popperOptions.modifiers,
    flip: {
      enabled: true,
      ...popperOptions.modifiers?.flip
    },
    preventOverflow: {
      enabled: true,
      ...(!isInsideModal && {
        boundariesElement: 'viewport',
        padding: 5
      }),
      ...(isInsideModal && {
        boundariesElement: 'scrollParent',
        padding: 0
      }),
      ...popperOptions.modifiers?.preventOverflow
    }
  }
})

const useWidthStyle = ({
  anchorEl,
  autoWidth,
  width
}: Pick<Props, 'anchorEl' | 'autoWidth' | 'width'>) => {
  const resolvedAnchorEl = getAnchorEl(anchorEl)
  const anchorElWidth = useWidthOf<ReferenceObject>(resolvedAnchorEl)

  if (width) {
    return { width }
  }

  if (autoWidth) {
    return { width: anchorElWidth }
  }

  return {}
}

export const Popper = forwardRef<PopperJs, Props>(function Popper(props, ref) {
  const {
    children,
    open,
    anchorEl,
    className,
    container,
    popperOptions = {},
    autoWidth,
    width,
    enableCompactMode,
    disablePortal,
    style,
    ...rest
  } = props

  const picassoRootContainer = usePicassoRoot()
  const { isModalVisible: isInsideModal } = useContext(ModalContext)

  const classes = useStyles()
  const isCompactLayoutResolution = useBreakpoint(['small', 'medium'])
  const isCompactLayout = enableCompactMode && isCompactLayoutResolution
  const widthStyle = useWidthStyle({ autoWidth, width, anchorEl })
  const anchorElWidthStyle = !isCompactLayout && widthStyle

  useLayoutEffect(() => {
    if (isCompactLayout && open && document.body.style.overflow !== 'hidden') {
      const prev = document.body.style.overflow

      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isCompactLayout, open])

  const memoizedPopperOptions = React.useMemo(
    () => getPopperOptions(popperOptions, isInsideModal),
    [popperOptions, isInsideModal]
  )

  return (
    <MUIPopper
      open={open}
      container={container || picassoRootContainer}
      anchorEl={anchorEl}
      className={cx(classes.root, className)}
      popperRef={ref}
      popperOptions={memoizedPopperOptions}
      disablePortal={disablePortal}
      style={{
        ...style,
        ...anchorElWidthStyle
      }}
      {...rest}
    >
      {children}
    </MUIPopper>
  )
})

Popper.defaultProps = {
  open: false,
  disablePortal: false,
  placement: 'bottom',
  popperOptions: {},
  autoWidth: true
}

Popper.displayName = 'Popper'

export default Popper
