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
  | 'isEqual'
  | 'validateFields'
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldHook = (name: string, config?: any) => unknown

const noop = () => {}
const defaultFormat = (value: unknown) => (value === undefined ? '' : value)
const holds = new WeakMap<FormApi, Map<string, Release>>()
const bareClaims = new WeakMap<FormApi, Map<string, Set<Release>>>()

const hasCreateConfig = (config: KeptFieldConfig) =>
  Boolean(
    config.afterSubmit ||
      config.beforeSubmit ||
      config.data ||
      config.formatOnBlur ||
      config.validateFields
  )

const releaseHold = (form: FormApi, name: string, only?: Release) => {
  const pending = holds.get(form)
  const release = pending?.get(name)

  // `only` leaves alone a hold that a later render took
  if (!release || (only && release !== only)) {
    return
  }

  pending?.delete(name)
  release()
}

const hold = (form: FormApi, name: string, config: KeptFieldConfig) => {
  if (!name || form.destroyOnUnregister || form.getFieldState(name)) {
    return
  }

  // The config that shapes the field state without running validation or
  // writing a value
  const release = form.registerField(
    name,
    noop,
    {},
    { silent: true, data: config.data, isEqual: config.isEqual }
  )
  const { value, initial } = form.getFieldState(name) ?? {}

  // Nothing stored: upstream's first render, a field `initialValue` included,
  // is already right
  if (value === undefined && initial === undefined) {
    release()

    return
  }

  const pending = holds.get(form) ?? new Map<string, Release>()

  pending.set(name, release)
  holds.set(form, pending)
  // A promise rather than `queueMicrotask`, which Jest's fake timers stop
  // eslint-disable-next-line promise/catch-or-return
  Promise.resolve().then(() => releaseHold(form, name, release))
}

const useClaim = (form: FormApi, name: string, config: KeptFieldConfig) => {
  const release = useRef<Release | null>(null)
  const latest = useRef(config)

  latest.current = config

  useIsomorphicLayoutEffect(() => {
    // So the claim, not the hold, creates the entry with the field's config
    releaseHold(form, name)

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
 * Works around react-final-form 7.0.1 losing a field's stored value when the
 * field mounts while final-form holds no state for it, as after every remount:
 *
 * - The first render is built from `initialValues`, and an array's shows no
 *   items. The hold, registered during render and released at commit, lets
 *   that render, and the children rendered with it, read the field state.
 * - The mount effect writes `initialValues` back (#1095). The claim,
 *   registered at commit and released right after that effect, prevents it.
 *   It creates the field entry, so it carries the config final-form applies
 *   only on create; `initialValue` or `defaultValue` would reseed, and holding
 *   it longer would strand a hidden field's error.
 *
 * TODO: [PF-2522] drop the hold once react-final-form's first render reads the
 * stored value, the claim once upstream fixes #1095, and this file with both
 */
export const useKeptFieldState = (
  name: string,
  config: KeptFieldConfig = {},
  hookName = 'useField'
) => {
  const form = useForm(hookName)

  hold(form, name, config)
  useClaim(form, name, config)
}

/**
 * Wraps a react-final-form field hook with `useKeptFieldState`, which must
 * hold before the hook's first render and claim after its mount effect
 */
export const keepFieldState = <Hook extends FieldHook>(
  useHook: Hook,
  hookName: string
) =>
  function useKeptField(name: string, config?: KeptFieldConfig) {
    const form = useForm(hookName)

    hold(form, name, config ?? {})

    const field = useHook(name, config)

    useClaim(form, name, config ?? {})

    return field
  } as Hook
