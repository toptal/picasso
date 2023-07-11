[FX-NNNN]

### Description

Describe the changes and motivations for the pull request.

### How to test

<!-- Temploy link will be updated automatically -->
- Temploy
- FIXME: Add the steps describing how to verify your changes

### Screenshots

| Before.                                 | After.                                  |
| --------------------------------------- | --------------------------------------- |
| Insert screenshots or screen recordings | Insert screenshots or screen recordings |

### Development checks

- [ ] Add changeset according to [guidelines](https://github.com/toptal/picasso/blob/master/docs/contribution/changeset-guidelines.md) (if needed)
- [ ] Read [CONTRIBUTING.md](https://github.com/toptal/picasso/blob/master/CONTRIBUTING.md) and [Component API principles](https://github.com/toptal/picasso/blob/master/docs/contribution/component-api.md)
- [ ] Make sure that additions and changes on the design follow [Toptal's BASE design](https://design.toptal.net/), and it's been already discussed with designers at #-base-core
- [ ] Annotate all `props` in component with documentation
- [ ] Create `examples` for component
- [ ] Ensure that deployed demo has expected results and good examples
- [ ] Ensure the changed/created components have not caused accessibility issues. [How to use accessibility plugin in storybook](https://github.com/toptal/picasso/blob/master/docs/contribution/accessibility.md).
- [ ] Self reviewed
- [ ] Covered with tests

**Breaking change**

- [ ] codemod is created and showcased in the changeset
- [ ] test alpha package of Picasso in StaffPortal

> All **_development checks_** should be done and set checked to pass the
> **GitHub Bot: TODOLess** action

<details>
<summary>PR commands</summary>
<br />

List of available commands:

- `@toptal-bot run package:alpha-release` - Release alpha version
- `@toptal-anvil ping reviewers` - Ping FX team for review

</details>

<details>
<summary>PR Review Guidelines</summary>
<br />

#### When to approve? ✅

**You are OK** with merging this PR and

1. You have no extra requests.
2. You have optional requests.
   1. Add `nit:` to your comment. (ex. `nit: I'd rename this variable from makeCircle to getCircle`)

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
