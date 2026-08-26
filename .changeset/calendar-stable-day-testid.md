---
'@toptal/picasso-calendar': major
---

### CalendarDay

- stop mutating the day testid with selection state. A selected day kept `day-button-<n>` instead of becoming `day-button-selected`, so the hook for a given day no longer disappears the moment it is picked — a same-day range (`[7, 7]`) can address the day twice. Read selection from the new `data-selected` attribute (or `aria-selected`) instead of from the testid
- prefix outside-month cells as `day-button-outside-<n>`, so a trailing day from the previous month no longer stamps the same testid as the in-month cell showing that number. Specs that reached for `click({ multiple: true })` to disambiguate can drop it

**Migration:** replace `getByTestId('day-button-selected')` with a `[data-selected]` query — for example `container.querySelector('[data-selected]')`, or `cy.getPopup().find('[data-selected]')`. To target one specific date across months, prefer the stable `data-calendar-day="<ISO date>"` hook the cell already carried. Measured before shipping: no `day-button-selected` usage exists in staff-portal or client-portal, and no spec in either targets the outside-month duplicate — the only dependents were three assertions in Picasso's own DatePicker tests
