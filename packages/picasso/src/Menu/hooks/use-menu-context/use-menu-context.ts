import { ReactElement, useMemo } from 'react'

export interface Props {
  onItemUpdate?: (key: string, menu: ReactElement) => void
  onItemClick?: (key: string, menu: ReactElement) => void
  onBackClick?: () => void
}

const useMenuContext = (props: Props) => {
  const { onItemClick, onItemUpdate, onBackClick } = props

  return useMemo(() => ({ onItemClick, onItemUpdate, onBackClick }), [
    onItemClick,
    onItemUpdate,
    onBackClick
  ])
}

export default useMenuContext
