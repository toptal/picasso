---
'@toptal/picasso-popper': major
'@toptal/picasso': major
---

### Popper

- migrate to tailwind styling

This affects priority of Popper's default `margin` and `padding` rules. Consumers that are supplying any overrides for these rules might need to increase specificity on their side. e.g. if you are using `<Popper className='mt-4' />`, after the upgrade `mt-4` will not have effect. In order to make it work you'll need to do `<Popper className='[&]:mt-4' />`
