import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { useAppConfig } from '@toptal/picasso-provider'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { PageHamburgerContextProvider } from '../PageHamburger'
import type { PageContextProps, ViewportWidthType } from './types'
import {
  createRootClassNames,
  createRootMinWidthClassNames,
  createRootVariableClassNames,
} from './styles'

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

  const { responsive } = useAppConfig()

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        ...createRootClassNames(),
        ...createRootVariableClassNames(),
        ...createRootMinWidthClassNames(responsive),
        className
      )}
      style={style}
    >
      <PageContext.Provider value={{ width, fullWidth }}>
        <PageHamburgerContextProvider hamburgerId={hamburgerId}>
          {children}
        </PageHamburgerContextProvider>
      </PageContext.Provider>
    </div>
  )
})

Page.displayName = 'Page'

export default Page
