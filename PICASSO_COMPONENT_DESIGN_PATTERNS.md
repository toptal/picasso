# Picasso Component Design Patterns

This document lists the design patterns that every Picasso component in this repository must follow. It is intended to be the source of truth for a CI workflow (GitHub Actions) that validates each component added or modified in a pull request.

## Patterns

1. **Optimize defaults for the common case.** Design the props API so the most frequently used look of a component requires zero or near-zero props. Pick sensible defaults for `variant`, `size`, `color`, etc., so consumers only pass props when deviating from the common case.
2. **Reuse prop names across components.** The same concept must use the same prop name everywhere. If `collapsed` denotes a collapsed state in one component, every other component expressing the same concept must also use `collapsed` — not `isCollapsed`, `folded`, or `minimized`. Reuse before inventing.
3. **Keep prop names short and simple.** Prop names should be as short as possible while staying readable. Prefer `size` over `sizeText`, `color` over `colorValue`, `label` over `labelString`. Drop redundant suffixes that restate the type or context.
4. **Mirror native HTML prop names.** When a prop corresponds to a native HTML attribute, use the native name verbatim (e.g., `name`, `value`, `type`, `disabled`, `placeholder`, `checked`, `readOnly`, `autoFocus`, `href`, `target`, `rel`, `alt`, `src`). Do not rename, prefix, or alias native attributes (avoid `inputName`, `fieldValue`, `isDisabled`, `linkHref`). For event handlers, keep the native name (`onChange`, `onBlur`, `onFocus`, `onClick`, …), but the callback signature may diverge from the native one when a simpler shape is more ergonomic — e.g., `onChange?: (value: string) => void` is preferred over passing the raw event when only the value is needed.
5. **Style overrides only via `className` or `style`.** Consumers may customize a component's appearance exclusively through the `className` and `style` props. Do not expose other styling hooks such as `classes`, `styles`, `sx`, `css`, theme overrides, slot-level class props, or styled-component wrappers as part of the public API.
6. **Prefer `children` over content props.** For simple components, pass content through `children` rather than a dedicated prop. Use `<Button>Save</Button>`, not `<Button content="Save" />`. Reserve named content props for components with multiple, distinct content slots.
7. **Use `rem` for all sizes.** Express dimensions, spacing, font sizes, and radii in `rem`. The only exception is `1px` (e.g., hairline borders), which may be used directly.
8. **Align token names with the BASE design system.** Names for colors, typography, sizes, spacings, and other design tokens must match those defined in the BASE design system, so design, code, and documentation share a single vocabulary. Do not introduce local synonyms or renamed aliases.
9. **Use `variant` for visual variations.** When a component has multiple visual styles, expose them through a single `variant` prop typed as a string-literal union (e.g., `variant?: 'rectangle' | 'circular'`). Do not split variants across multiple boolean flags or ad-hoc prop names.
10. **Extend `BaseProps`.** Every component's props interface must extend `BaseProps`, which provides the shared root-element contract: `className?: string`, `style?: CSSProperties`, and `'data-testid'?: string`. Do not redeclare these props locally.
11. **Use `as` to change the rendered element.** When a component needs to render as a different HTML tag, expose this through an `as` prop typed as `as?: React.ElementType<React.HTMLAttributes<HTMLElement>>`. Prefer narrowing the type to the specific tags the component actually supports (e.g., `as?: 'a' | 'button'`) rather than accepting any element type. Do not introduce custom alternatives like `tag`, `component`, or `element`.
12. **Use the shared size scale.** Expose size as a `size` prop typed against the shared `SizeType` helper, picking the subset the component supports from the canonical scale:

    ```ts
    export type Sizes =
      | 'xxsmall'
      | 'xsmall'
      | 'small'
      | 'medium'
      | 'large'
      | 'xlarge'

    export type SizeType<T extends Sizes> = T
    ```

    For example: `size?: SizeType<'small' | 'medium' | 'large'>`. Do not introduce custom size names (`tiny`, `big`, `huge`) or numeric scales.
13. **Use the shared color palette and shade scale.** Color props must draw base color names from the canonical `Palette` and shade names from `ColorSample`, exposing only the subset the component supports. Do not invent new color or shade names (`bright`, `pale`, `accent`, `orange`) or use raw hex/rgb values in the public API.

    ```ts
    interface ColorSample {
      lightest?: string
      lighter?: string
      lighter2?: string
      light?: string
      light2?: string
      main?: string
      main2?: string
      dark?: string
      darker?: string
    }

    interface Palette {
      blue: SimplePaletteColorOptions
      green: SimplePaletteColorOptions
      yellow: SimplePaletteColorOptions
      red: SimplePaletteColorOptions
      purple: SimplePaletteColorOptions
      gradients: {
        blue: string
        darkerBlue: string
        lightGrey: string
        grey: string
        darkerGrey: string
      }
    }
    ```
14. **No `is` prefix on boolean props.** Boolean props are named with the adjective only — `open`, `disabled`, `loading`, `selected`, `collapsed` — not `isOpen`, `isDisabled`, `isLoading`. The same applies to `has`/`should` prefixes.
15. **Use compound components for multi-part components.** When a component has distinct, composable sub-parts, expose them as static properties on the parent (e.g., `Modal.Title`, `Modal.Content`, `Modal.Actions`) rather than as separate named exports or as content props. Consumers compose the parts as children:

    ```tsx
    <Modal open={open} onClose={onClose}>
      <Modal.Title>Title</Modal.Title>
      <Modal.Content>…</Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
    ```
16. **Use `testIds` for multi-part test selectors.** When a component has multiple independently testable parts and the root `data-testid` is not enough, expose a single optional `testIds` prop — an object whose keys map to each addressable part. Each key is itself optional, and the component should fall back to sensible defaults or skip the attribute when unset. Do not add per-part `data-testid` props at the top level.

    ```ts
    // Shape — keys depend on the component's parts:
    testIds?: {
      [partName: string]: string | undefined
    }
    ```

## Form components

Rules in this section apply only to form components (inputs, selects, checkboxes, radios, date pickers, file uploaders, and similar field-style components).

1. **Extend `FieldProps` (or a descendant).** Every form component's props interface must extend `FieldProps` — the project's extended version of `final-form`'s field props — or a type that itself extends `FieldProps` (e.g., `InputProps`, `SelectProps`). This guarantees a consistent contract for `value`, `onChange`, validation state, error messaging, and form integration across every field-style component.
2. **Honor the standard form-field props.** Form components must accept and respect the full set of standard field props provided by `final-form` / `FieldProps` — including `name`, `value`, `defaultValue`, `required`, `disabled`, `onChange`, `onBlur`, `onFocus`, and any others surfaced by `FieldProps`. Do not selectively omit or rename them.
3. **Render through `PicassoField` (or a descendant).** Internally, every form component must use `PicassoField` — or a wrapper that itself builds on `PicassoField` (e.g., `OutlinedInput`, `InputBase`-style descendants) — to render its field chrome. This centralizes label, hint, error, required-marker, and layout behavior so all fields look and behave consistently. Do not reimplement field chrome ad hoc.
