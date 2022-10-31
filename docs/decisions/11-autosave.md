# RFC Template

## Problem

Developers want to have auto-save functionality for `RichTextEditor`, and `picasso-forms` doesn't have a built-in solution for this mechanism.

## Proposal

The auto-save feature is fully implemented in `picasso-forms` for all field types.

A mechanism that notifies the parent component about the form values changes will be provided. Then, the parent component will decide how to save this data (in BE or in external storage like local storage) and when. Validation errors will be ignored, for now, so the parent component can decide when to save the data with or without validation errors.

The implementation of the feature can be split into three parts as follows:

- To listen for form state changes, a `final-form` decorator that triggers a callback to notify the parent component with the latest values will be implemented.

- For performance reasons, the decorator will have a subscription functionality so that a component can listen to only specific field value changes.

- There won't be any changes to the `picasso-forms/Form` component since the decorator can be plugged in by using the `decorators` prop.

- A utility hook from `picasso-forms` will be implemented, to provide debouncing (for rapidly changing form values) and visual updates for the parent component ("saving|saved" states).

- A Picasso component as an indicator for showing valuable information to the end user about the "saving|saved" state.

### Drawbacks and limitations

- Form rendering performance might decrease as a result of using a new decorator.

## Alternatives

- Fully implement `RichTextEditor` auto-save feature on the product side without touching `picasso-forms`.
- Implement the auto-save feature just for the `RichTextEditor` field inside `picasso-forms`.
