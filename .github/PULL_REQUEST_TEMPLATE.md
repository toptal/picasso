[FX-NNNN]

### Description

Describe the changes and motivations for the pull request.

### How to test

- FIXME: Add the steps describing how to verify your changes

### Screenshots

| Before.                                 | After.                                  |
| --------------------------------------- | --------------------------------------- |
| Insert screenshots or screen recordings | Insert screenshots or screen recordings |

### Review

#### For developer
- [ ] Make sure you understand that your change can affect many other projects, not only yours. If your change breaks something, please ask other teams which use picasso if this change will not break anything in their projects.
- [ ] Check mobile or make sure mobile version is not needed/working, in case of troubles please check at #-base-core channel or with your product designer.
- [ ] Annotate all `props` in component with documentation, check existing components for an example e.g. [Button](https://github.com/toptal/picasso/blob/master/packages/picasso/src/Button/Button.tsx#L45-L80)
- [ ] If you add new component or update existing, add examples at storybook
- [ ] If you create new examples in storybook, use typescript and `tsx` extension. If you touch `jsx` story, convert it to `tsx`
- [ ] Ensure that deployed demo has expected results and good examples

#### For reviewer
- [ ] Make sure all `js/jsx` files are converted to typescript if needed
- [ ] Make sure that deployed demo has expected results and good examples

 
 If visual tests job failed, please check [this document]((https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md#fixing-broken-visual-tests-inside-a-pr)) and generate new screenshots locally, then check them out.
 
 Sometimes Jenkins job gets stucked, if so, please restart this job with one of the next ways: 
 
 - amend your commit and force push it to github
 - go to the failed job at jenkins and restart it manually
 - use github comment to trigger a jenkins job

<details>
<summary>List of available bot commands</summary>
<br />

- `@toptal-bot run all` - Run whole pipeline
- `@toptal-bot run danger` - Danger checks
- `@toptal-bot run lint` - Run linter
- `@toptal-bot run test` - Run jest
- `@toptal-bot run build` - Check build
- `@toptal-bot run test:visual` or `@toptal-bot run visual` - Run visual tests
- `@toptal-bot run deploy:documentation` - Deploy documentation


</details>
