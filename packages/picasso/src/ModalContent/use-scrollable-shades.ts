import { useEffect, useState } from 'react'
import debounce from 'debounce'

const useScrollableShades = (ref: React.RefObject<HTMLDivElement>) => {
  const [top, setTop] = useState(false)
  const [bottom, setBottom] = useState(false)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    const updateShades = debounce(() => {
      if (el.clientHeight === el.scrollHeight) {
        setTop(false)
        setBottom(false)
      }

      setTop(el.scrollTop > 0)
      setBottom(el.scrollTop + el.clientHeight < el.scrollHeight)
    }, 20)

    updateShades()

    el.addEventListener('scroll', updateShades)
    window.addEventListener('resize', updateShades)

    return () => {
      el.removeEventListener('scroll', updateShades)
      window.addEventListener('resize', updateShades)
    }
  }, [ref])

  return { top, bottom }
}

export default useScrollableShades
