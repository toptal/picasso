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

- [ ] Read [CONTRIBUTING.md](https://github.com/toptal/picasso/blob/master/CONTRIBUTING.md) and [Component API principles](https://github.com/toptal/picasso/blob/master/docs/api-principles.md)
- [ ] Make sure you've converted all `*.example.js/jsx` file into `*.example.ts/tsx` in your PR
- [ ] Annotate all `props` in component with documentation
- [ ] Create `examples` for component
- [ ] Ensure that deployed demo has expected results and good examples
- [ ] Ensure that unit tests pass by running `yarn test`
- [ ] Ensure that visuals tests pass by running `yarn test:visual`. If not - check the documentation [how to fix visual tests](https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md#fixing-broken-visual-tests-inside-a-pr)

<details>
<summary>PR commands</summary>
<br />

List of available commands:

- `@toptal-bot run all` - Run whole pipeline
- `@toptal-bot run danger` - Danger checks
- `@toptal-bot run lint` - Run linter
- `@toptal-bot run test` - Run jest
- `@toptal-bot run build` - Check build
- `@toptal-bot run test:visual` or `@toptal-bot run visual` - Run visual tests
- `@toptal-bot run deploy:documentation` - Deploy documentation

</details>
