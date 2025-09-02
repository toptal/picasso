## Runs integration tests

Action to conduct integration tests in a project using Cypress.

### Description

Action to conduct integration tests in a project using Cypress.

By default it executes `yarn test:integration:ci` command.

### Inputs

The list of arguments, that are used in GH Action:

| name      | type   | required | default             | description                              |
| --------- | ------ | -------- | ------------------- | ---------------------------------------- |
| `command` | string |          | test:integration:ci | Command to execute for integration tests |

### Outputs

Not specified

### ENV Variables

Not specified

### Usage

```yaml
  - uses: toptal/davinci-github-actions/integration-tests@v4.4.2
    with:
      command: test:e2e:ci
```
