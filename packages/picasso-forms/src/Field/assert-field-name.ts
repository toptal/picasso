/**
 * Fails fast, in development builds, when a form field renders without a `name`.
 *
 * `react-final-form@7` reads a mounting field's initial value with
 * `getIn(initialValues, name)`; with `name` undefined that returns the whole
 * `initialValues` object, and the `form.change(undefined, …)` that follows
 * fails deep inside final-form with "Cannot call setIn() with undefined key".
 * The error thrown here names the actual mistake instead.
 *
 * An assertion function, so a caller's `name` narrows to `string` past this
 * call. Production builds skip the check and trust the name, as the callers did
 * before the check existed.
 */
export const assertFieldName: (
  name: string | undefined
) => asserts name is string = name => {
  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error(
      '[picasso] A form field rendered without a `name`. Every Picasso form field registers with final-form under its `name` prop, so pass it through wherever the field is wrapped (a test fixture, a custom field component).'
    )
  }
}
