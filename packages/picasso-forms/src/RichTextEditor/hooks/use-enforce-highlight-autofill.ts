import { useCallback, useMemo, useState } from 'react'

import { useFormConfig } from '../../FormConfig'

const TRACKED_EVENTS_LIMIT = 3

export const useEnforceHighlightAutofill = () => {
  const { highlightAutofill } = useFormConfig()
  const [timesChangeOrFocusTriggered, setTimesChangeOrFocusTriggered] =
    useState(0)

  const enforceHighlightAutofill = useMemo(() => {
    if (!highlightAutofill) {
      return false
    }

    return timesChangeOrFocusTriggered < 2
  }, [highlightAutofill, timesChangeOrFocusTriggered])

  const registerChangeOrFocus = useCallback(() => {
    if (!highlightAutofill) {
      return
    }

    if (timesChangeOrFocusTriggered < TRACKED_EVENTS_LIMIT) {
      setTimesChangeOrFocusTriggered(timesChangeOrFocusTriggered + 1)
    }
  }, [timesChangeOrFocusTriggered])

  return {
    enforceHighlightAutofill,
    registerChangeOrFocus,
  }
}
