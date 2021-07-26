import { createContext, useContext } from 'react'

import { Alignment, BlockWidth, SeparatorVariant } from './settings'

interface OverviewBlockGroupSettings {
  align: Alignment
  blockWidth: BlockWidth
  separatorVariant: SeparatorVariant
}

const defaultSettings = {
  align: 'default' as const,
  blockWidth: 'regular' as const,
  separatorVariant: 'default' as const
}

export const OverviewBlockGroupContext = createContext<
  OverviewBlockGroupSettings
>(defaultSettings)

export const useOverviewBlockGroupContext = () => {
  return useContext(OverviewBlockGroupContext)
}
