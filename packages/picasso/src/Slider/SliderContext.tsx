import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { noop } from '../utils'

const SliderContext = createContext<{
  registerValueLabel: (
    index: number,
    tooltip: HTMLDivElement,
    thumb: HTMLElement
  ) => void
  hasTooltipOverlow: boolean
}>({
  registerValueLabel: noop,
  hasTooltipOverlow: false
})

interface ProviderProps {
  children: ReactNode
}

type ValueLabel = { tooltipWidth: number; thumb: HTMLElement }

const SliderContextProvider = ({ children }: ProviderProps) => {
  const [valueLabels, setValueLabels] = useState<(ValueLabel | null)[]>([
    null,
    null
  ])
  const [hasTooltipOverlow, setHasTooltipOverflow] = useState(false)

  const checkTooltipsOverlap = useCallback(() => {
    if (valueLabels[0] && valueLabels[1]) {
      const minDistance =
        (valueLabels[0].tooltipWidth + valueLabels[1].tooltipWidth) / 2

      const distance =
        valueLabels[1].thumb.offsetLeft - valueLabels[0].thumb.offsetLeft

      setHasTooltipOverflow(distance < minDistance && distance !== 0)
    }
  }, [valueLabels])

  const registerValueLabel = useCallback(
    (index: number, tooltip: HTMLDivElement, thumb: HTMLElement) => {
      if (!valueLabels[index]) {
        const newTooltips = [...valueLabels]

        newTooltips[index] = { thumb, tooltipWidth: tooltip.offsetWidth }

        setValueLabels(newTooltips)
      } else {
        checkTooltipsOverlap()
      }
    },
    [valueLabels, checkTooltipsOverlap]
  )

  const contextValue = useMemo(
    () => ({
      registerValueLabel,
      hasTooltipOverlow
    }),
    [registerValueLabel, hasTooltipOverlow]
  )

  return (
    <SliderContext.Provider value={contextValue}>
      {children}
    </SliderContext.Provider>
  )
}

const useSliderContext = () => useContext(SliderContext)

export { SliderContextProvider, useSliderContext }
