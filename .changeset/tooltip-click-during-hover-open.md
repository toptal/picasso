---
'@toptal/picasso-tooltip': patch
---

### Tooltip

- fix a regression where clicking a tooltip trigger during the hover-open delay
  (the classic "point at a `?` info icon and click within ~200ms" gesture) left
  the tooltip permanently suppressed for that hover session — it only re-opened
  once the pointer left the trigger and re-entered, which never happens while
  the cursor sits on it. base-ui opens the tooltip synchronously on the
  mousedown-focus, so the trailing click read that transient open and
  dismissed-then-latched it shut. A click that lands while a hover-open is
  still pending now lets the hover win instead of suppressing it; a click after
  the tooltip has deliberately opened still dismisses as before. This also
  unblocks consumer tests that `.click()` a tooltip trigger. [PF-2245]
