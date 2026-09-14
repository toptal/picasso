import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-final-form'

type ReleaseRef = MutableRefObject<(() => void) | null>

/**
 * Workaround for react-final-form 7.0.1 reseeding a field from `initialValues`
 * whenever it mounts and final-form holds no field state for it
 * (https://github.com/final-form/react-final-form/issues/1095, fixed by the
 * still-unreleased https://github.com/final-form/react-final-form/pull/1096).
 *
 * final-form drops `state.fields[name]` once the last subscriber of a field
 * unregisters, `destroyOnUnregister` or not, so that branch also runs for a
 * field that merely remounted (a conditional field, a wizard step, an
 * edit/preview toggle) and for a field mounting over a value the consumer
 * already wrote with `form.change()`. Either way the user's value is replaced
 * by the initial one, while the form's *values* still hold the right one.
 *
 * So the field state is recreated from those values for exactly as long as
 * react-final-form's mount effect needs to see it, by registering a subscriber
 * that carries no subscription and no validator and releasing it in the next
 * effect. It must not outlive the mount: final-form clears a field's error and
 * state only when the *last* subscriber unregisters, so a subscriber held for
 * the life of the form would strand the error of a field that unmounts — a
 * hidden `required` field would then block submit with nothing on screen to
 * explain it.
 *
 * Delete this file and its two calls in `Field` once a `react-final-form`
 * release contains #1096.
 */
export const useClaimedFieldState = (name: string): ReleaseRef => {
  const form = useForm()
  const release = useRef<(() => void) | null>(null)

  // Declared before `useField` so this effect runs before the mount effect it
  // exists to satisfy: effects run in the order their hooks are declared
  useEffect(() => {
    // `destroyOnUnregister` asks for exactly the behaviour this works around
    if (form.destroyOnUnregister) {
      return undefined
    }

    release.current = form.registerField(name, () => {}, {})

    // Only reached if the field unmounts before the release effect below runs
    return () => {
      release.current?.()
      release.current = null
    }
  }, [form, name])

  return release
}

/** Releases the claim above, once react-final-form has registered the real field */
export const useReleaseClaimedFieldState = (release: ReleaseRef) => {
  useEffect(() => {
    release.current?.()
    release.current = null
  })
}
