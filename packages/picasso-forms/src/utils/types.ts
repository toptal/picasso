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
 *
 * For background see the issues:
 *
 * https://github.com/microsoft/TypeScript/issues/45367
 * https://github.com/microsoft/TypeScript/issues/42436
 * https://github.com/microsoft/TypeScript/issues/31153
 */
export type OmitKnown<T, K extends keyof NoIndex<T>> = Omit<NoIndex<T>, K> & OnlyIndex<T>


/**
 * Merge 2 object types, if the two have the a property with the same, prefer the type of the second one
 */
export type Merge<T1, T2> = {
  [k in keyof NoIndex<T1>]: k extends keyof T2 ? T2[k] : NoIndex<T1>[k]
} & OnlyIndex<T1>
