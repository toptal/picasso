import React from 'react'
import { Container as PicassoContainer, ContainerProps } from '@toptal/picasso'

const Container = ({
  children,
  top,
  bottom
}: Pick<ContainerProps, 'top' | 'bottom' | 'children'>) => (
  <PicassoContainer top={top} bottom={bottom}>
    {children}
  </PicassoContainer>
)

Container.displayName = 'Container'

export default Container
