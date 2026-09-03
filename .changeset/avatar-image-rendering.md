---
'@toptal/picasso-avatar': patch
---

### Avatar

- remove the legacy `-webkit-optimize-contrast` image-rendering hint from image avatars — Chrome now aliases it to `crisp-edges`, which forces low-quality downscaling; photos use the browser's default high-quality resampling again
