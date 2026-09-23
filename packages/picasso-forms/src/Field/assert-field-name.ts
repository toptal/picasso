export const assertFieldName: (
  name: string | undefined
) => asserts name is string = name => {
  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error(
      '[picasso] A form field rendered without a `name`. Every Picasso form field registers with final-form under its `name` prop, so pass it through wherever the field is wrapped (a test fixture, a custom field component).'
    )
  }
}
