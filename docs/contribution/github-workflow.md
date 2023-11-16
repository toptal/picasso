# GitHub Workflow

In order to maintain good strict [semver](https://semver.org/) versioning of
`Picasso`. We utilize [changesets](https://github.com/changesets/changesets/)
for versioning and managing releases on monorepo packages.

## PR workflow
Every PR’s is checked against several automatic jobs which are always automatically run on every push. You don’t need to trigger any special phrase as running all jobs takes ~4minutes we currently run all on every commit.

### Temploys

To make reviews easier we have automatic "temploy" like deployment for every commit pushed to your PR. It's being run and published regardless of any errors, therefore even if you have known problems you can just create a PR and you will get automatically link to the online storybook built against your branch.

### CI Jobs ran on every commit
* Danger - Checks for non-conformities inside a PR. Currently, it is used for checking non-conformities against commit conventions described in the next section.
* Jest Test - Runs Jest snapshots. (not visual tests)
* Lint - Runs code linter.
* Visual Tests - Runs visual regression tests. [See how to update them]
(https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md#fixing-broken-visual-tests-inside-a-pr)
* Deploy docs - This job will deploy live preview of your changes

## CI Release workflow and commit messages
Automatic analysis is run by NPM package [semantic-release](https://semantic-release.gitbook.io) which does all the work under the cover. The main script which runs from the CI job [./bin/release](https://github.com/toptal/picasso/blob/master/bin/release) is checking all commits pushed to the `master` branch since the last release published to GitHub. Based on those commits it automatically bumps the version.

### Commit conventions

- Starts with a capital letter;
- Does not end with a full-stop (i.e .);
- Starts with a word in the imperative mood (i.e Build instead of Built);
- Not longer than 79 chars.

_Fixup and squash commits (i.e. commits starting with fixup! or squash!) are
ignored by these validations._

> [!NOTE]
> See also this article about how to write good commit messages:
> https://chris.beams.io/posts/git-commit/

#### CI Jobs schema
![ci-schema](https://user-images.githubusercontent.com/324488/57615639-7c1a3e80-757c-11e9-8edb-3b358a42949a.png)

