# Introducing upload functionality for avatar

## Problem

There is a new feature to help users upload their avatars. So the component will have the shape of an avatar but it will act like a file input. If the input has a selected or uploaded image, the image will be displayed in the background.

### Requirements

- It has all states like a FileInput
- It can also act like a field so that if the field is empty, the user should be notified after form submission.
- It is also expected to show warning and error according to the file that which user is trying to upload.
- Drag-and-drop is not required but it is nice to have

## Proposal

There can be a new component called `AvatarUpload` which will render `AvatarWrapper` as default and will use `useDropzone` from `react-dropzone` for getting the file to upload. `ImageAvatar` will be used to display selected or uploaded avatar image in background.

For form usages, we can implement the field wrapper layer just like `FileInput` but the component should have the same behaviors and callbacks as `Dropzone`.

### Advantages

- Using `useDropzone` will bring a drag-and-drop feature which may be requested later soon.
- Use `useDropzone` directly instead of `Dropzone` because `Dropzone` will require more updates to be used inside `AvatarUpload`.

## Alternatives

### Use `FileInput` instead of `useDropzone`

- This alternative will require a rework when the drag-and-drop feature is requested.

### Add `FileInput` functionality to `Avatar` without introducing new component

- This alternative will complicate `Avatar` component a lot and the problem looks like more of a composition issue instead of an extension.
