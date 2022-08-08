# Introducing upload functionality for avatar

## Problem

There is a new feature to get avatar uploads through `Avatar` component. So the component will look like an avatar but after hovering, it will show file upload mechanism to the user.

### Requirements

- It has all states like a FileInput
- It can also act like a field so that if field is empty, user should be notified after form submission.
- It is also expected to show warning and error according to the file which user is trying to upload.
- Drag-and-drop is not required but it is nice to have

## Proposal

There can be a new component called `AvatarUpload` which will render `Avatar` as default and will use `useDropzone` from `react-dropzone` for hovered state.

For form usages, we can implement the field wrapper layer just like `FieldInput` but the component should have the same behaviors like `Dropzone`.

### Advantages

- Using `useDropzone` will bring drag-and-drop feature which might be requested later soon.
- Use `useDropzone` directly instead of `Dropzone` because `Dropzone` will require more updates to be able to used inside `AvatarUpload`.

## Alternatives

### Use `FileInput` instead of `useDropzone`

- This alternative will require a rework when drag-and-drop features is requested.

### Add `FileInput` functionality to `Avatar` without introducing new component

- This alternative will complicate `Avatar` component a lot and the problem looks like more of a composition issue instead of extension.
