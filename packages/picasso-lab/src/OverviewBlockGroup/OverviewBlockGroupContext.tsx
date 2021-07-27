import { createContext, useContext } from 'react'

import { Alignment, BlockWidth } from './settings'

interface OverviewBlockGroupSettings {
  align: Alignment
  blockWidth: BlockWidth
}

const defaultSettings = {
  align: 'default' as const,
  blockWidth: 'regular' as const
}

export const OverviewBlockGroupContext = createContext<
  OverviewBlockGroupSettings
>(defaultSettings)

export const useOverviewBlockGroupContext = () => {
  return useContext(OverviewBlockGroupContext)
}
