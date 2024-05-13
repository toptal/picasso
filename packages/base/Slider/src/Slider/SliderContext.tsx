import type { ReactNode } from 'react'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { noop } from '@toptal/picasso-utils'

const SliderContext = createContext<{
  registerValueLabel: (
    index: number,
    tooltip: React.RefObject<HTMLSpanElement>
  ) => void
  checkTooltipsOverlap: () => void
  hasTooltipOverlap: boolean
}>({
  registerValueLabel: noop,
  checkTooltipsOverlap: noop,
  hasTooltipOverlap: false,
})

interface ProviderProps {
  children: ReactNode
}

type ValueLabel = React.RefObject<HTMLSpanElement>

const SliderContextProvider = ({ children }: ProviderProps) => {
  const [valueLabels, setValueLabels] = useState<(ValueLabel | null)[]>([
    null,
    null,
  ])
  const [hasTooltipOverlap, setHasTooltipOverlap] = useState(false)

  const checkTooltipsOverlap = useCallback(() => {
    if (valueLabels[0] && valueLabels[1]) {
      const gap = 16
      const rect1 = valueLabels[0].current?.getBoundingClientRect()
      const width1 = valueLabels[0].current?.offsetWidth

      const rect2 = valueLabels[1].current?.getBoundingClientRect()
      const width2 = valueLabels[1].current?.offsetWidth

      if (!rect1 || !rect2 || !width1 || !width2) {
        return
      }

      let doesOverlap = false

      if (hasTooltipOverlap) {
        doesOverlap = rect1.right + gap + width2 / 2 > rect2.left - width1 / 2
      } else {
        doesOverlap = rect1.right + gap > rect2.left
      }
      setHasTooltipOverlap(doesOverlap)
    }
  }, [valueLabels, hasTooltipOverlap])

  const registerValueLabel = useCallback(
    (index: number, tooltip: React.RefObject<HTMLSpanElement>) => {
      if (!valueLabels[index]) {
        const newTooltips = [...valueLabels]

        newTooltips[index] = tooltip

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
      hasTooltipOverlap,
      checkTooltipsOverlap,
    }),
    [registerValueLabel, hasTooltipOverlap, checkTooltipsOverlap]
  )

  return (
    <SliderContext.Provider value={contextValue}>
      {children}
    </SliderContext.Provider>
  )
}

const useSliderContext = () => useContext(SliderContext)

export { SliderContextProvider, useSliderContext }
