import { useEffect } from 'react'

type Props = {
  ref?: React.RefObject<HTMLElement>
  handler: (event: MouseEvent) => void
}

const useHandleClickOutside = ({ ref, handler }: Props) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Node | null)) {
        return
      }

      handler(event)
    }

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useHandleClickOutside
