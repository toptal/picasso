---
'@toptal/picasso-provider': patch
---

### Favicon

- render the favicon `<link>` tags only once their icon URLs have resolved. React 19 decides whether a `<link>` can be hoisted into `<head>` when the element mounts, and a link mounted with an undefined `href` renders in place and stays there even after the href arrives — so under React 19 the favicons never reached the document head. The icons load asynchronously, so the links now mount with their hrefs already set
