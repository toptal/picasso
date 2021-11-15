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
- [ ] Annotate all `props` in component with documentation
- [ ] Create `examples` for component
- [ ] Ensure that deployed demo has expected results and good examples
- [ ] Ensure that tests pass by running `yarn test`
- [ ] Ensure that visuals tests pass by running `yarn test:visual`. If not - check the documentation [how to fix visual tests](https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md#fixing-broken-visual-tests-inside-a-pr)
- [ ] Ensure the changed/created components have not caused accessibility issues. [How to use accessibility plugin in storybook](https://github.com/toptal/picasso/blob/master/docs/contribution/accessibility.md).

<details>
<summary>PR commands</summary>
<br />

List of available commands:

- `@toptal-bot run all` - Run whole pipeline
- `@toptal-bot run build` - Check build
- `@toptal-bot run visual` - Run visual tests
- `@toptal-bot run deploy:documentation` - Deploy documentation
- `@toptal-bot run package:alpha-release` - Release alpha version

</details>

<details>
<summary>PR Review Guidelines</summary>
<br />

#### When to approve? ✅

**You are OK** with merging this PR and
1. You have no extra requests.
2. You have optional requests.
   1. Add `nit: ` to your comment. (ex. `nit: I'd rename this variable from makeCircle to getCircle`)

#### When to request changes? ❌

**You are not OK** with merging this PR because
1. Something is broken after the changes.
2. Acceptance criteria is not reached.
3. Code is dirty.

#### When to comment (neither ✅ nor ❌)

**You want your comments to be addressed** before merging this PR in cases like:
1. There are leftovers like unnecessary logs, comments, etc.
2. You have an opinionated comment regarding the code that requires a discussion.
3. You have questions.

#### How to handle the comments?

1. An owner of a comment is the only one who can resolve it.
2. An owner of a comment must resolve it when it's addressed.
3. A PR owner must reply with ✅ when a comment is addressed.

</details>
