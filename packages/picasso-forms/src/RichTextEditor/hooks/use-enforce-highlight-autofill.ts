import { useCallback, useMemo, useState } from 'react'

import { useFormConfig } from '../../FormConfig'

/**
 * This hook keeps the highlighted state for Rich Text Editor form fields after
 * first `onChange` callback which is triggered by editor itself when initial value is
 * provided. Starting from second `onChange` or first `onFocus` invocation (which are
 * triggered by user) the field is no longer highlighted.
 *
 * Editor triggers the very first onChange callback by itself only when initial value
 * is provided in order to propagate the value to wrapping form.
 */

/**
 * After first two editor changes are tracked (the initial one and the one originated
 * from user), hook stops responding due to performance reasons.
 */
const TRACKED_EVENTS_LIMIT = 2

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

    if (timesChangeOrFocusTriggered <= TRACKED_EVENTS_LIMIT) {
      setTimesChangeOrFocusTriggered(timesChangeOrFocusTriggered + 1)
    }
  }, [highlightAutofill, timesChangeOrFocusTriggered])

  return {
    enforceHighlightAutofill,
    registerChangeOrFocus,
  }
}
