---
'@toptal/picasso-tailwind-merge': minor
'@toptal/picasso-avatar-upload': patch
'@toptal/picasso-calendar': patch
'@toptal/picasso-carousel': patch
'@toptal/picasso-collapse': minor
'@toptal/picasso-notification': patch
'@toptal/picasso-number-input': patch
'@toptal/picasso-page': patch
'@toptal/picasso-select': minor
'@toptal/picasso-slider': patch
'@toptal/picasso-table': minor
'@toptal/picasso-timeline': minor
---

### Tailwind Merge

- upgrade `tailwind-merge` to `^3.6.0`. The `3.x` line is the one that understands the Tailwind CSS v4 class vocabulary; `2.x` only knows v3, so the package has been a major version behind the `tailwindcss@^4.2.1` peer the theme packages already require. The Picasso `CONFIG` is unchanged — `font-size`, `font-weight` and `text-alignment` all still exist as class group ids in v3
- `twMerge` now resolves conflicts for utilities that only exist in Tailwind v4 and were previously passed through unrecognised, so a consumer `className` finally wins over the component's own class. Affected utilities include `min-h-auto` / `max-h-auto`, `outline-hidden` (v4's rename of `outline-none`, which now correctly overrides it), the two-axis `translate-*` shorthand, `border-2` against `border-x`/`border-y`, `shrink-<number>`, and the trailing-`!` important syntax (`no-underline!`)
- `bg-linear-to-*` is no longer misread as a background _color_. Under `2.x` a gradient direction and a `bg-<color>` shared one conflict group, so whichever came last silently dropped the other — this affected `Modal.Content`'s scroll shades, where a `bg-*` class could remove the gradient
- conversely, Tailwind v3's removed `bg-gradient-to-*` spelling is no longer recognised as a gradient direction and now conflicts with `bg-<color>`. It still compiles under `tailwindcss@4.2.1` as a deprecated alias, but use `bg-linear-to-*` instead
- no API change: `twMerge` and `twJoin` keep their signatures, and `tailwind-merge` v3 still ships CJS, ESM and types

### Carousel

- rename `bg-gradient-to-r` to `bg-linear-to-r` in the edge gradients, matching the Tailwind v4 spelling. Both compile to the same CSS, so there is no visual change
- build `CarouselNavigation`'s dot styles with `twJoin` instead of a multi-line template literal, so the rendered `class` attribute no longer carries the literal's newlines and indentation. Same classes, same order

### AvatarUpload

- fix the cursor never changing away from `cursor-pointer`. The root class list was built with `twJoin`, which does not resolve conflicts, so the unconditional `cursor-pointer` and the conditional `cursor-no-drop` / `cursor-default` all reached the DOM and Tailwind's emission order decided the winner — always `cursor-pointer`. A disabled `AvatarUpload` now shows `cursor-no-drop` as intended
- `disabled` now takes precedence over `showAvatar`, so a disabled upload that already has an image reads as disabled (`cursor-no-drop`) rather than inert (`cursor-default`). Both conditions are independent, so the combination is reachable; it was simply unobservable while `cursor-pointer` always won
- the upload icon colour helper in `styles.ts` uses `twMerge` too, so the `error` status colour reliably beats the hover colour instead of depending on stylesheet order

### Calendar

- the `CalendarIndicators` resolves its today-dot colour with `twMerge`, so the `isSelected` white overrides the default blue by argument order rather than by stylesheet order. No visual change

### Notification

- the icon container resolves its `min-w` with `twMerge`, so the `yellow` variant's narrower width overrides the default by argument order rather than by stylesheet order. No visual change

### NumberInput

- the `NumberInputEndAdornment` resolves its root class list with `twMerge`, and drops two dead classes: `bg-inherit`, immediately overridden by `bg-transparent`, and `active:[&+&]:border-t-solid`, which emits no CSS at all because Tailwind has no per-side border-style utility. The border style is already set unconditionally by `[&+&]:border-solid`. No visual change

### Slider

- the thumb resolves its class list with `twMerge`, so `isThumbHidden`'s `hidden` overrides the base `flex` by argument order rather than by stylesheet order. No visual change

### Collapse

- switch the root class list to `twMerge` so a consumer `className` overrides the component's own classes. Previously `overflow-auto` passed by a consumer lost to the internal `overflow-hidden` / `overflow-visible`, because `twJoin` emitted both and the stylesheet order decided

### Page

- the `PageTopBar` builds its inner class list with `twMerge` instead of `twJoin`, with the unconditional `max-w` default moved ahead of the `width` overrides so precedence stays default -> `wide` -> `full`. No behavior change

### Select

- switch `SelectOptions` to `twMerge` so a consumer `className` overrides the internal `shadow-5` and the `fixedHeader` / `fixedFooter` padding. Previously `pt-*` overrides and shadows below `shadow-5` silently lost
- the `SelectCaret` and `NonNativeSelect` resolve their class lists with `twMerge`, so the `disabled` caret colour and the `horizontal` layout width override their defaults by argument order rather than by stylesheet order. `SelectCaret` also drops a commented-out line referencing the removed `classes` API. No visual change
- the `SelectCaret` and `NativeSelectInput` pass their base classes to `twMerge` as one string per line instead of a multi-line template literal. No rendered change — `twMerge` already collapsed the literal's whitespace

### Table

- switch `TableExpandableRow` to `twMerge` and put the consumer `className` last, so it overrides the `stripeEven` background on the expanded row. The two rows the component renders now resolve a consumer `className` the same way

### Timeline

- switch `TimelineRow`'s icon class list to `twMerge` and put the icon's own `className` last, so a consumer can recolor the icon. Previously `<TimelineRow icon={<Icon className='text-blue-500' />} />` stayed grey because the internal `text-gray-600` won on stylesheet order
- build the default dot's class list with `twJoin` instead of a multi-line string literal, so the rendered `class` attribute no longer carries the literal's newlines and indentation. Same classes, same order
