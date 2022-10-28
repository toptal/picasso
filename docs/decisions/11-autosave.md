# RFC Template

## Problem

Users want to have auto-save functionality for RichTextEditor and Picasso-forms doesn't have a built-in solution for this mechanism.

## Proposal

We will fully implement auto-save feature in Picasso-forms for all field types.

We will provide a mechanism to notify parent component about form values changes and parent component will decide how to save this data (in BE or an external storage like local storage) and when. Validation errors will be ignored for now, so parent component can decide when to save the data with or without validation errors.

The implementation of the feature can be split to three parts as follows:

- To be able to listen form state changes, we will implement a decorator for `final-form` and trigger a callback to notify parent component with latest values. For performance, we will implement a subscription functionality similar to `final-form` so user can listen only specific fields' value changes.

- We will provide a utility hook from Picasso-forms to provide debouncing (for rapidly changing form values) and visual updates for the parent component ("saving|saved" states).

- There will also be a Picasso component as indicator for showing valuable info for the user about "saving|saved" state.

### Drawbacks and limitations

- It would be a good idea to test form rendering performance since it will start using a new decorator.

## Alternatives

- Fully implement RichTextEditor auto-save feature on product side without touching Picasso-forms.

  - While keeping form state, we thought that it would be easier to implement this feature inside Picasso.

- Implement auto-save feature just for RichTextEditor field inside Picasso-forms.
  - Instead of implementing the feature just for RichTextEditor, we decided to cover all types of input fields so the feature would become more useful for all product teams.
