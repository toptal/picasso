---
'@toptal/picasso-tailwind-merge': major
'@toptal/picasso-avatar-upload': patch
'@toptal/picasso-calendar': patch
'@toptal/picasso-carousel': patch
'@toptal/picasso-notification': patch
'@toptal/picasso-number-input': patch
'@toptal/picasso-page': patch
'@toptal/picasso-select': patch
'@toptal/picasso-slider': patch
'@toptal/picasso-timeline': patch
---

### TailwindMerge

- upgrade `tailwind-merge` to `^3.6.0`, the line that knows Tailwind v4's classes
- the `shadow-0` to `shadow-24` scale counts as box shadows, so `shadow-none`, arbitrary shadows and shadow colors resolve against it instead of erasing or ignoring it
- a consumer `className` now wins for v4-only utilities that were passed through: `min-h-auto`, `max-h-auto`, `outline-hidden` (over `outline-none`), two-axis `translate-*`, `border-2` against `border-x`/`border-y`, `shrink-<number>` and the trailing `!` important syntax
- `bg-linear-to-*` no longer conflicts with `bg-<color>`, which could drop `Modal.Content`'s scroll shades. Tailwind 3's `bg-gradient-to-*` now does, so use `bg-linear-to-*`
- `twMerge` and `twJoin` keep their signatures

### AvatarUpload

- a disabled `AvatarUpload` shows `cursor-no-drop`, also when it has an image, where `cursor-pointer` always won
- the `error` status icon color wins over the hover color

### Select

- a consumer `className` on the options overrides their `shadow-5` and the `fixedHeader`/`fixedFooter` padding

### Timeline

- a `TimelineRow` icon's own `className` wins, so `<Icon className='text-blue-500' />` recolors it

### Calendar, Carousel, Notification, NumberInput, Page and Slider

- class lists resolve conflicts with `twMerge` instead of stylesheet order. No visual change
