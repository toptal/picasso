---
'@toptal/picasso-collapse': minor
---

### Collapse

- drop react-transition-group, whose `findDOMNode` React 19 removes. Public props are unchanged
- the animations start about 50 ms sooner
- unrecognized props, such as `data-private`, reach the DOM node
- the consumer `className` is merged last, so it overrides the component's own classes, such as `overflow-hidden`
- add the `CollapseProps` type and deprecate the misnamed `FadeProps` alias
- the object form of `timeout` sets each direction's duration, including `appear`, where it produced an invalid inline value
