import { useEffect, useRef } from 'react'
import type { FormApi } from 'final-form'
import type { UseFieldConfig } from 'react-final-form'
import { useForm } from 'react-final-form'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

type Release = () => void

type KeptFieldConfig = Pick<
  UseFieldConfig,
  | 'afterSubmit'
  | 'beforeSubmit'
  | 'data'
  | 'format'
  | 'formatOnBlur'
  | 'validateFields'
>

const noop = () => {}
const defaultFormat = (value: unknown) => (value === undefined ? '' : value)
const bareClaims = new WeakMap<FormApi, Map<string, Set<Release>>>()

const hasCreateConfig = (config: KeptFieldConfig) =>
  Boolean(
    config.afterSubmit ||
      config.beforeSubmit ||
      config.data ||
      config.formatOnBlur ||
      config.validateFields
  )

const useClaim = (form: FormApi, name: string, config: KeptFieldConfig) => {
  const release = useRef<Release | null>(null)
  const latest = useRef(config)

  latest.current = config

  useIsomorphicLayoutEffect(() => {
    // `destroyOnUnregister` asks for the reseed
    if (!name || form.destroyOnUnregister) {
      return undefined
    }

    const bare = !hasCreateConfig(latest.current)
    const byName = bareClaims.get(form) ?? new Map<string, Set<Release>>()
    const sameName = byName.get(name) ?? new Set<Release>()

    // A claim without that config, such as a listener's or a group child's,
    // gives way to one with it, whatever order they register in
    if (!bare) {
      Array.from(sameName).forEach(releaseBare => releaseBare())
    }

    const unregister = form.registerField(
      name,
      noop,
      {},
      {
        silent: true,
        // Mirrors react-final-form's own `beforeSubmit` wrapper
        beforeSubmit: () => {
          const {
            beforeSubmit,
            formatOnBlur,
            format = defaultFormat,
          } = latest.current

          if (formatOnBlur) {
            const fieldState = form.getFieldState(name)

            if (fieldState) {
              const formatted = format(fieldState.value, name)

              if (formatted !== fieldState.value) {
                form.change(name, formatted)
              }
            }
          }

          return beforeSubmit?.()
        },
        afterSubmit: () => latest.current.afterSubmit?.(),
        data: latest.current.data,
        validateFields: latest.current.validateFields,
      }
    )
    let released = false
    const releaseClaim = () => {
      if (!released) {
        released = true
        sameName.delete(releaseClaim)
        unregister()
      }
    }

    if (bare) {
      sameName.add(releaseClaim)
      byName.set(name, sameName)
      bareClaims.set(form, byName)
    }

    release.current = releaseClaim

    return releaseClaim
  }, [form, name])

  // No dependency list: a `name` change re-claims, and that must be released
  // too
  useEffect(() => {
    release.current?.()
    release.current = null
  })
}

/**
 * Works around react-final-form 7.0.1's mount effect writing `initialValues`
 * back over the value the form stores for a field it holds no state for, as
 * after every remount (final-form/react-final-form#1095). The claim registers
 * at commit, before that effect, and releases right after it. It creates the
 * field entry, so it carries the config final-form applies only on create;
 * `initialValue` or `defaultValue` would reseed, and holding the entry longer
 * would strand a hidden field's error. Call it after react-final-form's hook,
 * or in a component that renders react-final-form's `Field`, so the release
 * follows the mount effect.
 *
 * TODO: [PF-2522] drop once a react-final-form release fixes #1095 (#1096)
 */
export const useKeptFieldState = (
  name: string,
  config: KeptFieldConfig = {},
  hookName = 'useField'
) => useClaim(useForm(hookName), name, config)
