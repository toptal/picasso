/* eslint-disable import/no-extraneous-dependencies */
import type { MouseEvent } from 'react'

export type ChildrenProps = {
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onMouseOver?: (event: MouseEvent<HTMLElement>) => void
  onMouseMove?: (event: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void
}

export type ContainerValue = HTMLElement | (() => HTMLElement)
