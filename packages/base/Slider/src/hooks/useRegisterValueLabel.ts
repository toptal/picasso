import { useRef, useEffect } from 'react'

import { useSliderContext } from '../Slider/SliderContext'

export const useRegisterValueLabel = ({ index }: { index: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const { registerValueLabel } = useSliderContext()

  useEffect(() => {
    registerValueLabel(index, ref)
  }, [index, registerValueLabel])

  return ref
}
