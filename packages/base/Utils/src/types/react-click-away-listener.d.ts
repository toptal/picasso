declare module 'react-click-away-listener' {
  import type { ReactNode, FC, CSSProperties } from 'react'

  interface ClickAwayListenerProps {
    onClickAway: (event: MouseEvent | TouchEvent) => void
    children: ReactNode
    mouseEvent?: 'click' | 'mousedown' | 'mouseup' | false
    touchEvent?: 'touchstart' | 'touchend' | false
    className?: string
    style?: CSSProperties
  }

  const ClickAwayListener: FC<ClickAwayListenerProps>
  export default ClickAwayListener
}
