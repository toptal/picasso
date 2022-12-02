import { useEffect } from 'react'

/**
 * This hook is meant to be used in final form.
 * It uses custom mutator `setHasMultilineCounter`
 * to set whether or not the component has a multiline counter (possible for RichTextEditor and multiline Input).
 * This information is then used in FormField to move `autoSaveIndicator` to the right place.
 */
export const useHasMultilineCounter = (
  name: string | undefined,
  hasCounter: boolean | undefined,
  setHasMultilineCounter?: (name: string, hasCounter: boolean) => void
) => {
  useEffect(() => {
    if (name && typeof setHasMultilineCounter === 'function') {
      setHasMultilineCounter(name, !!hasCounter)
    }
  }, [name, hasCounter, setHasMultilineCounter])
}
