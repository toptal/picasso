import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'
import type { UseFieldConfig } from 'react-final-form'
import { useForm } from 'react-final-form'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

type ReleaseRef = MutableRefObject<(() => void) | null>

export type ClaimedFieldConfig = Pick<
  UseFieldConfig,
  | 'afterSubmit'
  | 'beforeSubmit'
  | 'data'
  | 'format'
  | 'formatOnBlur'
  | 'validateFields'
>

const defaultFormat = (value: unknown) => (value === undefined ? '' : value)

/**
 * Works around react-final-form 7.0.1 reseeding a field from `initialValues` on
 * every mount, since final-form drops field state on unmount (#1095).
 *
 * The claim is a throwaway subscriber registered in the layout phase, so before
 * react-final-form's mount effect, and released right after it. It creates the
 * field entry, so it carries the config final-form applies only on create;
 * adding `initialValue` or `defaultValue` would reseed. Held longer, it would
 * strand a hidden field's error.
 *
 * TODO: [PF-2522] delete this file and its calls once upstream fixes #1095
 */
export const useClaimedFieldState = (
  name: string,
  config: ClaimedFieldConfig
): ReleaseRef => {
  const form = useForm()
  const release = useRef<(() => void) | null>(null)
  const latest = useRef(config)

  latest.current = config

  useIsomorphicLayoutEffect(() => {
    // `destroyOnUnregister` asks for the reseed
    if (!name || form.destroyOnUnregister) {
      return undefined
    }

    release.current = form.registerField(
      name,
      () => {},
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

    return () => {
      release.current?.()
      release.current = null
    }
  }, [form, name])

  return release
}

export const useReleaseClaimedFieldState = (release: ReleaseRef) => {
  // No dependency list: a `name` change re-claims, and that must be released
  // too
  useEffect(() => {
    release.current?.()
    release.current = null
  })
}
