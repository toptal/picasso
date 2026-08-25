/**
 * The DOM contract these commands are written against. Every selector here is a
 * hook Picasso guarantees; none of them depend on tag names or nesting depth,
 * both of which Base UI is free to change.
 */

/**
 * Marks the floating element of every Picasso popup — Select, Dropdown, Menu,
 * Autocomplete, DatePicker. Roles vary per consumer (`presentation`, `dialog`,
 * `menu`), so the role can never be the marker; this attribute always is.
 */
export const POPPER_SELECTOR = '[data-picasso-popper]'

/** Only real Tooltips keep `role="tooltip"` — Select/Dropdown poppers do not. */
export const TOOLTIP_SELECTOR = '[role="tooltip"]'

/**
 * Marks a Tooltip's anchor — the rendered trigger child owning the open/close
 * listeners. Hover THIS to open a tooltip whose child is natively disabled.
 */
export const TOOLTIP_ANCHOR_SELECTOR = '[data-picasso-tooltip-anchor]'

/** Options inside a Select/Autocomplete listbox. */
export const OPTION_SELECTOR = '[role="option"]'

/**
 * The visible element a user interacts with for a toggle control. Checkbox and
 * Switch render this span plus a visually-hidden native `<input>` **sibling**
 * kept only for form participation; state lives here, as ARIA.
 */
export const TOGGLE_ROLE_SELECTOR = '[role="checkbox"], [role="switch"]'

/** As above, plus Radio — which did not move to Base UI and stays a real input. */
export const CONTROL_ROLE_SELECTOR =
  '[role="checkbox"], [role="switch"], [role="radio"]'

export const CONTROL_INPUT_SELECTOR =
  'input[type="checkbox"], input[type="radio"]'

export const NATIVE_CONTROL_SELECTOR = 'input, button, select, textarea'

/**
 * jQuery's `:contains()` takes a quoted string, so a literal `"` or `\` in the
 * text breaks the selector. Escaping both makes any text safe to embed.
 */
export const escapeContainsText = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
