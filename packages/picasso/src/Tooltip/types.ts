import { ChangeEvent } from 'react'

export type ChildrenProps = {
  onClick?: (event: ChangeEvent<{}>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export type ContainerValue = HTMLElement | (() => HTMLElement)
