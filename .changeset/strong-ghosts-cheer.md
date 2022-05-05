---
'@toptal/picasso': patch
'@toptal/picasso-charts': patch
'@toptal/picasso-forms': patch
'@topkit/analytics-charts': patch
---

Remove circular dependencies between components.
They were the cause of a strange error in the tests
when you used `jest.requireActual('@toptal/picasso')`
