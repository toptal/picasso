import { makeStyles, Theme } from '@material-ui/core/styles'
import Portal from '@material-ui/core/Portal'
import { useSidebar } from '@toptal/picasso-provider'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import ButtonCircular from '../ButtonCircular'
import Container from '../Container'
import { BackMinor16, ChevronRight16 } from '../Icon'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { getHamburgerContainer } from '../PageHamburger'
import SidebarItem from '../SidebarItem'
import SidebarLogo from '../SidebarLogo'
import SidebarMenu from '../SidebarMenu'
import { noop, useBreakpoint } from '../utils'
import { SidebarContextProvider } from './SidebarContextProvider'
import styles from './styles'
import { VariantType } from './types'

export interface Props extends BaseProps {
  /** Style variant of Sidebar and subcomponents */
  variant?: VariantType
  /** Content */
  children?: ReactNode
  /** Indicates Sidebar is collapsible */
  collapsible?: boolean
  /** Indicates Sidebar is collapsed as default */
  defaultCollapsed?: boolean
  /** Callback to notify when sidebar is having collapsed or default state */
  testIds?: {
    collapseButton?: string
    container?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PageSidebar',
})

export const PageSidebar = forwardRef<HTMLDivElement, Props>(function Sidebar(
  props,
  ref
) {
  const {
    children,
    variant = 'light',
    className,
    style,
    collapsible,
    defaultCollapsed,
    testIds,
  } = props
  const classes = useStyles()
  const { setHasSidebar } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(!!defaultCollapsed)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)
  const { setShowHamburger } = useContext<PageContextProps>(PageContext)

  useEffect(() => {
    // Clear expanded submenu on sidebar collapse
    if (isCollapsed) {
      setExpandedItemKey(null)
    }
  }, [isCollapsed])

  useEffect(() => {
    setHasSidebar(true)

    return function cleanup() {
      setHasSidebar(false)
    }
  }, [setHasSidebar])

  useEffect(() => {
    setShowHamburger?.(true)
  }, [])

  const isCompactLayout = useBreakpoint(['small', 'medium'])

  const handleCollapseButtonClick = useCallback(() => {
    setIsCollapsed(previousState => !previousState)
  }, [setIsCollapsed])

  const sidebar = (
    <Container
      ref={ref}
      flex
      direction='column'
      style={style}
      className={cx(classes.root, className, classes[variant], {
        [classes.rootCollapsed]: collapsible && isCollapsed,
      })}
      data-testid={testIds?.container}
      onMouseEnter={collapsible ? () => setIsHovered(true) : noop}
      onMouseLeave={collapsible ? () => setIsHovered(false) : noop}
    >
      <div className={classes.spacer} />
      {collapsible && (
        <ButtonCircular
          className={cx(classes.collapseButton, {
            [classes.buttonVisible]: isHovered,
          })}
          onClick={handleCollapseButtonClick}
          icon={isCollapsed ? <ChevronRight16 /> : <BackMinor16 />}
          aria-label='collapse sidebar'
          variant='primary'
          data-testid={testIds?.collapseButton}
        />
      )}
      <SidebarContextProvider
        isCollapsed={isCollapsed}
        isHovered={isHovered}
        variant={variant}
        expandedItemKey={expandedItemKey}
        setExpandedItemKey={setExpandedItemKey}
      >
        {children}
      </SidebarContextProvider>
    </Container>
  )

  return isCompactLayout ? (
    <Portal container={getHamburgerContainer}>{children}</Portal>
  ) : (
    sidebar
  )
})

PageSidebar.defaultProps = {
  variant: 'light',
}

PageSidebar.displayName = 'PageSidebar'

export default Object.assign(PageSidebar, {
  Menu: SidebarMenu,
  Item: SidebarItem,
  Logo: SidebarLogo,
})
