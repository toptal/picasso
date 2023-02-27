import { useEffect } from 'react'

type Props = {
  callback: (
    event: Glider.GliderEvent<{
      value: string | number
      type: 'arrow' | 'dot' | 'slide'
    }>
  ) => void
  elementRef: React.RefObject<HTMLDivElement>
}

const useOnGliderAnimated = ({ elementRef, callback }: Props) => {
  useEffect(() => {
    const element = elementRef.current

    element?.addEventListener('glider-animated', callback)

    return () => {
      element?.removeEventListener('glider-animated', callback)
    }
  }, [callback, elementRef])
}

export default useOnGliderAnimated
