---
'@toptal/picasso': major
'@toptal/picasso-forms': major
---

### Dropdown, AvatarUpload

- type of the `accept` prop has changed

```diff
<Dropzone
- accept='image/*'
+ accept={{ 'image/*': [] }}
>
```
