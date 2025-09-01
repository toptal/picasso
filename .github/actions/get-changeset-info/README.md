## Get Changeset info

Uses changeset's power to return information about changed/release state of packages in monorepo for current branch.

### Description

### Inputs

The list of arguments, that are used in GH Action:

| name       | type   | required | default       | description                                      |
| ---------- | ------ | -------- | ------------- | ------------------------------------------------ |
| `base-ref` | string |          | origin/master | Default ref/branch to use as base for comparison |

### Outputs

The list of variables, that are returned by GH Action:

| name               | type          | description                                              |
| ------------------ | ------------- | -------------------------------------------------------- |
| `changed-packages` | Array<string> | Packages that have changed                               |
| `release-packages` | Array<string> | Packages that have changeset                             |
| `missing-packages` | Array<string> | Packages that have changed but are missing in changesets |

### ENV Variables

Not specified

### Usage

```yaml
  - name: Get changeset info
    id: changeset-info
    uses: toptal/davinci-github-actions/get-changeset-info@v4.5.0
    with:
      base-ref: origin/master
```
