import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

type Root = {
  maxDepth: number
}

const getBackgroundColor = ({ maxDepth }: Root) => {
  return Array.from({ length: maxDepth }, (_, index) => index + 1).reduce(
    (acc, index) => {
      const isOdd = index % 2 !== 0

      return (
        acc +
        `
      &[data-level='${index}'] {
          background-color: ${
            isOdd ? palette.common.white : palette.grey.lightest
          };
      }
    `
      )
    },
    ''
  )
}

export const root = ({ maxDepth }: Root) => css`
  border-radius: 0.5em;
  background: ${palette.grey.lighter};

  .rule-group {
    ${getBackgroundColor({ maxDepth })};
  }

  .query-builder-branches {
    .rule-group[data-level='1'],
    .rule[data-level='1'],
    .rule[data-level='2'],
    .rule-group[data-level='2'] {
      &::before,
      &::after {
        border-color: ${palette.blue.main};
      }
    }
  }

  .rule-group[data-level='0'] {
    > .rule-group-header {
      .rule-group-combinator {
        order: 0;
      }

      .rule-group-add-group {
        order: 1;
      }

      .rule-group-add-rule {
        order: 2;
      }
    }
  }

  .rule-group-body {
    .rule-group-header {
      .rule-group-combinator {
        order: 0;
      }

      .rule-group-remove {
        order: 1;
      }

      .rule-group-duplicate {
        order: 2;
      }

      .rule-group-add-group {
        order: 3;
      }

      .rule-group-add-rule {
        order: 4;
      }
    }
  }

  .rule-group-header {
    justify-content: flex-end;
  }

  .rule button,
  .rule-group-header button {
    margin: 0;
  }
`
