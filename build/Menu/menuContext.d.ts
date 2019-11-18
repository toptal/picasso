import { ReactElement } from 'react'
export interface MenuContextProps {
  push?: (key: string, menu: ReactElement) => void
  pop?: () => void
  refresh?: (key: string, menu: ReactElement) => void
}
declare const _default: import('react').Context<MenuContextProps>
export default _default
