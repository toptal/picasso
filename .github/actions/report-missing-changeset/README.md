## Report Missing Changeset

Tool for monorepos that use changesets for release.
It compares packages described in changesets with packages that have been changed and
issues a warning comment if there is a missing dependency.
Requires checked out repository with `fetch-depth: 0`

### Description

### Inputs

The list of arguments, that are used in GH Action:

| name           | type   | required | default | description                   |
| -------------- | ------ | -------- | ------- | ----------------------------- |
| `github-token` | string | ✅        |         | Token for authorization       |
| `base-branch`  | string |          | master  | Base branch of the repository |

### Outputs

Not specified

### ENV Variables

Not specified

### Usage

```yaml
  - name: Checkout
    uses: actions/checkout@v4
    with:
      fetch-depth: 0

  - name: Report missing changeset
    uses: toptal/davinci-github-actions/report-missing-changeset@v4.6.0
    with:
      github-token: ${{ secrets.TOPTAL_DEVBOT_TOKEN }}
```
