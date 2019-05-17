# Github Workflow
In order to maintain good strict [semver](https://semver.org/) versioning of `Picasso`  our commit convention follows [conventionalcommits.org](https://www.conventionalcommits.org) workflow.  This helps us to automatically determine version change by automatic analysis of git commits between two given releases. 

## PR workflow
Every PR’s is checked against several automatic jobs which are always automatically run on every push. You don’t need to trigger any special phrase as running all jobs takes ~4minutes we currently run all on every commit. 

### Temploys

To make reviews easier we have automatic "temploy" like deployment for every commit pushed to your PR. It's being run and published regardless of any errors, therefore even if you have known problems you can just create a PR and you will get automatically link to the online storybook built against your branch.

### CI Jobs ran on every commit
* Danger - Checks for non-conformities inside a PR. Currently, it is used for checking non-conformities against conventional commits described in the next section.
* Jest Test - Runs Jest snapshots. (not visual tests)
* Lint - Runs code linter.
* Visual Tests - Runs visual regression tests. [See how to update them]
(https://github.com/toptal/picasso/blob/master/docs/contribution/visual-snapshots.md)
* Deploy docs - This job will deploy live preview of your changes

## CI Release workflow and commit messages
Automatic analysis is run by NPM package [semantic-release](https://semantic-release.gitbook.io) which does all the work under the cover. The main script which runs from the CI job [./bin/release](https://github.com/toptal/picasso/blob/master/bin/release) is checking all commits pushed to the `master` branch since the last release published to GitHub. Based on those commits it automatically bumps the version. 

### Commit messages patterns
Commits messages need to follow patterns to let `semantic-release` correctly check which version needs to be published. 

#### General commit message pattern
`type(scope?): description`

* `type` - Possible values are `feat | fix | chore | refactor | style | ci`
* `scope` - Any scope to which `type` applies, usually we either omit scope or use the component name.
* `description` - Description of changes, needs to start with **lowercase** character to pass checks. 

Let’s assume that we are fixing expected behavior inside `Button` component and we are not in any way changing API of components which could lead to non-backward compatible issues. 
Commit message could be following:
`fix(button): fix onChange handler incorrect execution`

💡 ***TIP:*** If you see that danger is still failing make sure that everything is `lowercased`! This applies to all `type`, `scope` and `description`
💡 ***TIP:*** Those rules are also enforced to titles of all PR's

#### Introducing breaking changes
We try to always provide backward compatible changes to component’s API but if it’s necessary we might introduce a breaking change, we can do it by adding magic constant `BREAKING CHANGE` somewhere to commit description. This keyword will trigger `major` version bump to `Picasso` version. 

#### Using CLI to generate commit messages
In order to simplify generating correct commit message, `Picasso` has installed `git` helper to `prepare-commit-msg` with nice terminal prompt. This command invokes [commitizen/cz-cli](https://github.com/commitizen/cz-cli) prompt utility which will ask you several questions and generate the correct commit message. You can create commits with running `yarn commit` instead of `git commit` and go through the asked questions.

#### Version determination
To better illustrate how versions are bumped let’s assume that the current version of `Picasso` is `0.1.0`.

If we create `chore | docs | fix | style | refactor`  commit type,  `semantic-release` will initiative `patch` version bump. Therefore our version will be the following:

`0.1.0 -> 0.1.1`

If we create `feat` commit type, change we will be following:

`0.1.0 -> 0.2.0`

If we will create `BREAKING CHANGE` commit type, the change will be following: 

`0.1.0 -> 1.0.0`

More about default rules could be found here  [semantic-release/lib/default-release-rules.js](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js) 

#### CI Jobs schema
![ci-schema](https://user-images.githubusercontent.com/324488/57615639-7c1a3e80-757c-11e9-8edb-3b358a42949a.png)

