import { TOGGLE_ROLE_SELECTOR } from './selectors'

/**
 * Shared resolution between `setChecked` and `toggleControl`, so the two can
 * never drift: given any subject shape — the role element, the hidden native
 * input, or a wrapper/field container holding both — locate one part of a
 * Checkbox/Switch pair. The two elements are siblings by Base UI's contract.
 */

export const resolveToggleInput = (
  $el: JQuery<HTMLElement>
): JQuery<HTMLElement> => {
  if ($el.is('input')) {
    return $el.first()
  }

  if ($el.is(TOGGLE_ROLE_SELECTOR)) {
    return $el.first().siblings('input').first()
  }

  return $el.find('input').first()
}

export const resolveToggleRole = (
  $el: JQuery<HTMLElement>
): JQuery<HTMLElement> => {
  if ($el.is(TOGGLE_ROLE_SELECTOR)) {
    return $el.first()
  }

  if ($el.is('input')) {
    return $el.first().siblings(TOGGLE_ROLE_SELECTOR).first()
  }

  return $el.find(TOGGLE_ROLE_SELECTOR).first()
}
