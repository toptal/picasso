import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useEffect, useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import debounce from 'debounce'

import { PageHamburgerContextProvider } from '../PageHamburger'
import type { PageContextProps, ViewportWidthType } from './types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** DEPRECATED! Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width `wide` | `full` */
  width?: ViewportWidthType
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.TopBar`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
  hamburgerId?: string
}

export const PageContext = React.createContext<PageContextProps>({})

const useStyles = makeStyles<Theme>(styles, {
  name: 'Page',
})

// eslint-disable-next-line react/display-name
export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  props,
  ref
) {
  const {
    children,
    className,
    hamburgerId = 'hamburger',
    style,
    width,
    fullWidth,
    ...rest
  } = props
  const classes = useStyles()

  const [isHamburgerModeActive, setHamburgerMode] = useState(false)

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      if (!window) {
        return
      }

      if (window.matchMedia('(min-width: 1280px)').matches) {
        setHamburgerMode(false)
      } else {
        setHamburgerMode(true)
      }
    }, 200)

    // Call handler right away so state gets updated with initial viewport
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    // Cleanup function
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [setHamburgerMode])

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <PageContext.Provider value={{ width, fullWidth, isHamburgerModeActive }}>
        <PageHamburgerContextProvider hamburgerId={hamburgerId}>
          {children}
        </PageHamburgerContextProvider>
      </PageContext.Provider>
    </div>
  )
})

Page.displayName = 'Page'

export default Page
