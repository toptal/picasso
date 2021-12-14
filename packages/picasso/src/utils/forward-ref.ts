import React from 'react'

export type Component<T, P> = T & {
  defaultProps?: Partial<P>
  displayName?: string
}

/**
 * Wraps the exotic generic functional component type returned by the `forwardRef`.
 * This function adopts the type of the exotic compoennt to take `defaultProps` and
 * `displayName`.
 *
 * @see forwardRef
 *
 * @param component exotic component returned by `forwardRef`
 */
export const documentable = <T, P>(component: T): Component<T, P> => component

/**
 * Wrapper around React.forwardRef that preserves genericity of the passed `Component`.
 * @note If you need to set `defaultProps` and `displayName` properties, you need to wrap
 * result of this function into `documentable`,
 *
 * @see documentable
 *
 * @warning ⚠️ Use it only when you need to preserve genericity of the component as it
 * omits some type checks on the prop type of the component and IT DOESN'T ADD ref
 * property type to the list of props — you have to do it on your own. If you don't
 * care about genericity use React.forwardRef directly.
 *
 * @param component React component conforming to forwardRef type constraints
 */
export const forwardRef = <P, T>(
  component: (props: P, ref: React.Ref<T>) => React.ReactElement | null
) =>
  (React.forwardRef(component) as unknown) as (
    props: P & { ref?: React.Ref<T> }
  ) => React.ReactElement | null
