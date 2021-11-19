import React, { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => (
  <div style={{ flex: 1 }}>{children}</div>
)

Container.displayName = 'Container'

export default Container
