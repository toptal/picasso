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
      setBottom(Math.ceil(el.scrollTop) + el.clientHeight < el.scrollHeight)
    }, 20)

    updateShades()

    el.addEventListener('scroll', updateShades)
    window.addEventListener('resize', updateShades)
    const observer = new MutationObserver(updateShades)

    observer.observe(el, { childList: true, subtree: true })

    return () => {
      updateShades.clear()
      el.removeEventListener('scroll', updateShades)
      window.addEventListener('resize', updateShades)
      observer.disconnect()
    }
  }, [ref])

  return { top, bottom }
}

export default useScrollableShades
