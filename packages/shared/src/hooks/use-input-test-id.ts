import { useCallback } from 'react'

/**
 * Callback ref that stamps `data-testid` onto the `<input>` a Base UI
 * primitive renders internally (e.g. the visually-hidden input of
 * Checkbox/Switch). Base UI exposes that input only through `inputRef` —
 * no prop reaches the input element itself — so the attribute is applied
 * imperatively. The ref re-attaches whenever the testid changes, keeping
 * the attribute in sync (and removing it when the testid is unset).
 */
export const useInputTestId = (testId?: string) =>
  useCallback(
    (input: HTMLInputElement | null) => {
      if (!input) {
        return
      }

      if (testId === undefined) {
        input.removeAttribute('data-testid')
      } else {
        input.setAttribute('data-testid', testId)
      }
    },
    [testId]
  )
