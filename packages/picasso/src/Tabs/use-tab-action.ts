import { Ref, useEffect, useRef } from 'react'
import { TabsActions } from '@material-ui/core'

/*
 * MuiTabs break when the size of a tab changes without rendering with React.
 * This issue happens when the font is loaded after the initial render of the component.
 * To solve this issue, we imperatively update the indicator and scroll buttons when it happens.
 */
const useTabAction = (): Ref<TabsActions> => {
  const ref = useRef<TabsActions>(null)

  useEffect(() => {
    const listener = () => {
      ref.current?.updateIndicator()
      ref.current?.updateScrollButtons()
    }

    window.addEventListener('load', listener)

    return () => window.removeEventListener('load', listener)
  }, [])

  return ref
}

export default useTabAction
