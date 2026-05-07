import { twMerge } from '@toptal/picasso-tailwind-merge'

/**
 * `withClasses` — Tailwind-routing compatibility shim that preserves the
 * `classes` prop pattern from MUI v4 in the post-`@base-ui/react`-migration
 * world. Per migration plan v4 §2.3, every Picasso component accepts an
 * optional `classes?: Partial<Record<*ClassKey, string>>` prop where each
 * slot key is a string of Tailwind classes that are merged into the
 * component's base className for that slot via `twMerge`.
 *
 * Replaces the v3-era plan to remove `classes` universally. Preserves
 * ~80% of consumer `classes` usage in the 23-repo portfolio.
 *
 * @example
 *   type ButtonClassKey = 'root' | 'label' | 'icon'
 *   const baseClasses: Record<ButtonClassKey, string> = {
 *     root: 'inline-flex items-center px-4 py-2',
 *     label: 'font-semibold',
 *     icon: 'mr-2',
 *   }
 *
 *   function Button({ classes, ...rest }: { classes?: Partial<Record<ButtonClassKey, string>> }) {
 *     const merged = withClasses(baseClasses, classes)
 *     return (
 *       <button className={merged.root}>
 *         <span className={merged.icon}>...</span>
 *         <span className={merged.label}>...</span>
 *       </button>
 *     )
 *   }
 *
 * Limits (NOT covered by this shim, per migration plan v4 §2.3):
 *   - MUI v4 nested-state selectors like `& .Mui-disabled`, `&$expanded`
 *   - Generated MUI class names like `.MuiButton-root` (consumer styles
 *     keyed off these break; codemods or manual fixes required)
 *   - `classes` keys that don't match the component's declared slot type
 *     (silently ignored — TS catches this at the consumer call-site)
 *
 * The shim is dependency-light: only `@toptal/picasso-tailwind-merge`
 * (already a peer dep across base/* components). Returns a fresh object
 * to avoid mutating the input `base` map.
 */
export function withClasses<K extends string>(
  base: Record<K, string>,
  overrides: Partial<Record<K, string>> | undefined
): Record<K, string> {
  if (!overrides) {return base}
  const out = { ...base } as Record<K, string>

  for (const key in base) {
    if (overrides[key]) {
      out[key] = twMerge(base[key], overrides[key] as string)
    }
  }

  return out
}
