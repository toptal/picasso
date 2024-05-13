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

  /**
   * if we have range slider, there is a chance
   * when we select values next to each other
   * that the lables might overlap each other. Like this example:
   * [   ][   ]
   *   A    B
   *
   * In that case we need to reposition the labels to the edges of the thumb:
   * [   ]  [   ]
   *     A  B
   *
   * This function checks if the labels overlap and sets the state accordingly.
   * It is called on each render of the component and everytime the Slider changes value.
   *
   **/
  const checkTooltipsOverlap = useCallback(() => {
    const isRangeSlider = valueLabels[0] && valueLabels[1]

    if (!isRangeSlider) {
      return
    }

    const gap = 16
    const rect1 = valueLabels[0]?.current?.getBoundingClientRect()
    const rect2 = valueLabels[1]?.current?.getBoundingClientRect()

    if (!rect1 || !rect2) {
      return
    }

    const halfWidth1 = rect1.width / 2
    const halfWidth2 = rect2.width / 2
    const rightBoundaryWithGap = rect1.right + gap

    // If there is an overlap already, in next rerender
    // we need add half of the width to check if it is still overlapping
    const rightBoundaryOfFirstLabel = hasTooltipOverlap
      ? rightBoundaryWithGap + halfWidth1
      : rightBoundaryWithGap
    const leftBoundaryOfSecondLabel = hasTooltipOverlap
      ? rect2.left - halfWidth2
      : rect2.left

    const doesOverlap = rightBoundaryOfFirstLabel > leftBoundaryOfSecondLabel

    setHasTooltipOverlap(doesOverlap)
  }, [valueLabels, hasTooltipOverlap])

  /**
   * On we register each ValueLabel on render
   * so we can check later if the labels overlap
   */
  const registerValueLabel = useCallback(
    (index: number, tooltip: React.RefObject<HTMLSpanElement>) => {
      if (!valueLabels[index]) {
        const newTooltips = [...valueLabels]

        newTooltips[index] = tooltip

        setValueLabels(newTooltips)
      }
    },
    [valueLabels]
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
