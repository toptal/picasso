import { Container } from '@toptal/picasso-container'
import type { ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

import styles from './styles'

type ContextValue = {
  portalEl?: HTMLElement
  setPortalEl: (element: HTMLElement | null) => void
}

const Context = createContext<ContextValue>({
  setPortalEl: () => {},
})

export const ToolbarProvider = ({ children }: { children: ReactNode }) => {
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)

  return (
    <Context.Provider value={{ portalEl: portalEl ?? undefined, setPortalEl }}>
      {children}
    </Context.Provider>
  )
}

export const useToolbarPortalRegister = () => {
  const { setPortalEl } = useContext(Context)

  return {
    setToolbarPortalEl: setPortalEl,
  }
}

export type Props = {
  children: ReactNode
  keyName: string
}

export const Toolbar = (props: Props) => {
  const { children, keyName } = props
  const { portalEl } = useContext(Context)

  const classes = styles

  if (!portalEl) {
    return null
  }

  return createPortal(
    <Container className={classes.group}>{children}</Container>,
    portalEl,
    keyName
  )
}
