import { ChangeEvent, MouseEvent } from 'react'

export type ChildrenProps = {
  onClick?: (event: ChangeEvent<{}>) => void
  onMouseOver?: (event: MouseEvent<HTMLDivElement>) => void
  onMouseMove?: (event: MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void
}

export type ContainerValue = HTMLElement | (() => HTMLElement)
