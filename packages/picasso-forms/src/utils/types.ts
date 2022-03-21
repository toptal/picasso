/**
 * Remove index sigantures from types, leaving only constant properties. Eg:
 *
 * Type:
 * { foo: string, [k: string]: any }
 *
 * Becomes:
 * { foo: string }
 *
 * See explanation on https://stackoverflow.com/a/68261113/4595583
 */
export type NoIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K]
}

/**
 * Inverse of NoIndex, keep only the index signature
 */
export type OnlyIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? K : never]: T[K]
}

/**
 * This is an Omit implementation that works with indexed types (meaning it ignores index types altogether)
 * For background see the issues:
 * https://github.com/microsoft/TypeScript/issues/45367
 * https://github.com/microsoft/TypeScript/issues/42436
 * https://github.com/microsoft/TypeScript/issues/31153
 */
export type OmitKnown<T, K extends keyof NoIndex<T>> = Omit<NoIndex<T>, K> & OnlyIndex<T>

