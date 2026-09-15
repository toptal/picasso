import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'
import type { UseFieldConfig } from 'react-final-form'
import { useForm } from 'react-final-form'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

type ReleaseRef = MutableRefObject<(() => void) | null>

/**
 * The parts of a field's configuration final-form reads only while it creates
 * the field entry, so the claim below has to carry them.
 */
export type ClaimedFieldConfig = Pick<
  UseFieldConfig,
  | 'afterSubmit'
  | 'beforeSubmit'
  | 'data'
  | 'format'
  | 'formatOnBlur'
  | 'validateFields'
>

// `react-final-form`'s own default, mirrored so the flush below formats a
// missing value exactly as its `beforeSubmit` would
const defaultFormat = (value: unknown) => (value === undefined ? '' : value)

/**
 * Workaround for react-final-form 7.0.1 reseeding a field from `initialValues`
 * whenever it mounts and final-form holds no field state for it
 * (https://github.com/final-form/react-final-form/issues/1095; a fix is
 * proposed in the still-open
 * https://github.com/final-form/react-final-form/pull/1096).
 *
 * final-form drops `state.fields[name]` once the last subscriber of a field
 * unregisters, `destroyOnUnregister` or not, so that branch also runs for a
 * field that merely remounted (a conditional field, a wizard step, an
 * edit/preview toggle) and for a field mounting over a value the consumer
 * already wrote with `form.change()`. Either way the user's value is replaced
 * by the initial one, while the form's *values* still hold the right one.
 *
 * So the field state is recreated from those values for exactly as long as
 * react-final-form's mount effect needs to see it: a subscriber that carries no
 * subscription and no validator is registered in the layout phase and released
 * in the next passive effect. React runs every layout effect of a commit
 * before any passive effect, so the claim precedes that mount effect whether it
 * belongs to this component's own `useField` or to a react-final-form `Field`
 * rendered by a descendant (the radios of a `Form.RadioGroup`, the checkboxes
 * of a `Form.CheckboxGroup`); and a descendant's passive effects run before
 * its ancestor's, so the release follows it.
 *
 * The claim registers the field's `beforeSubmit`, `afterSubmit`, `data` and
 * `validateFields` because it is the call that creates the entry, and
 * final-form applies those four only then: for an entry that already exists it
 * re-applies `isEqual`, the validators, `initialValue` and `defaultValue`, but
 * never the submit hooks. Without them react-final-form's own registration adds
 * nothing, and its `beforeSubmit` — the wrapper that applies `format()` to a
 * `formatOnBlur` field at submit time — is silently dropped, so such a field
 * submits its raw value. `initialValue` and `defaultValue` are deliberately not
 * claimed: final-form re-applies them for the real registration, and seeding
 * them here is the reseed this module exists to prevent.
 *
 * The claim must not outlive the mount: final-form clears a field's error and
 * state only when the *last* subscriber unregisters, so a subscriber held for
 * the life of the form would strand the error of a field that unmounts — a
 * hidden `required` field would then block submit with nothing on screen to
 * explain it.
 *
 * TODO: [PF-2262] delete this file and its calls once a `react-final-form`
 * release contains a fix for #1095.
 */
export const useClaimedFieldState = (
  name: string,
  config: ClaimedFieldConfig
): ReleaseRef => {
  const form = useForm()
  const release = useRef<(() => void) | null>(null)
  const latest = useRef(config)

  // Assigned while rendering so the layout effect below, and the hooks it
  // registers, read the props of the render they belong to
  latest.current = config

  useIsomorphicLayoutEffect(() => {
    // `destroyOnUnregister` asks for exactly the behaviour this works around;
    // a missing name is `assertFieldName`'s to report and has nothing to claim
    if (!name || form.destroyOnUnregister) {
      return undefined
    }

    release.current = form.registerField(
      name,
      () => {},
      {},
      {
        // Mirrors react-final-form's own wrapper: flush `formatOnBlur` through
        // `format` before validation runs, then defer to the consumer's hook and
        // return its result, so returning `false` still blocks the submit
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

    // Only reached if the field unmounts before the release effect below runs
    return () => {
      release.current?.()
      release.current = null
    }
  }, [form, name])

  return release
}

/**
 * Releases the claim above once react-final-form has registered the real
 * field. A passive effect, so it runs after the mount effect of this
 * component's `useField` and after those of any `Field` a descendant renders.
 */
export const useReleaseClaimedFieldState = (release: ReleaseRef) => {
  useEffect(() => {
    release.current?.()
    release.current = null
  })
}
