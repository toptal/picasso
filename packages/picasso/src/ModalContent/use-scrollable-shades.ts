import { useEffect, useState } from 'react'

const useScrollableShades = (ref: React.RefObject<HTMLDivElement>) => {
  const [top, setTop] = useState(false)
  const [bottom, setBottom] = useState(false)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    const updateShades = () => {
      if (el.clientHeight === el.scrollHeight) {
        return
      }

      setTop(el.scrollTop > 0)
      setBottom(el.scrollTop + el.clientHeight < el.scrollHeight)
    }

    updateShades()
    el.addEventListener('scroll', updateShades)

    return () => el.removeEventListener('scroll', updateShades)
  }, [ref])

  return { top, bottom }
}

export default useScrollableShades
