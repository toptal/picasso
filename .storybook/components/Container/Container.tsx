import React, { FunctionComponent } from 'react'

const Container: FunctionComponent<{}> = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
)

Container.displayName = 'Container'

export default Container
