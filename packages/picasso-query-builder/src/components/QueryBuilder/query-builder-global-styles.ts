/* eslint-disable */

/**
 * we moved the styles from react query builder library css file to styled components to fix problem
 * related to cdn caching issue causing an error in production.
 * Issue URL: https://toptal-core.atlassian.net/browse/ER-28394
 */
import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

// Basic
const rqbSpacing = '1.5rem'
const rqbSmallSpacing = '1rem'
const rqbWhiteBackgroundColor = palette.common.white
const rqbBorderColor = palette.grey.light2
const rqbBorderStyle = 'solid'
const rqbBorderRadius = '0.5rem'
const rqbBorderWidth = '0.0625rem'

// Drag-and-drop
const rqbDndSpacing = '0.5rem'
const rqbDndHoverBorderBottomColor = 'rebeccapurple'
const rqbDndHoverCopyBorderBottomColor = '#669933'
const rqbDndHoverBorderBottomStyle = 'dashed'
const rqbDndHoverBorderBottomWidth = '0.125rem'

// Branches
const rqbBranchIndent = '0.75rem'
const rqbBranchRadius = '0'
const rqbBranchColorLight = palette.blue.light
const rqbBranchWidth = rqbBorderWidth
const rqbBranchStyle = rqbBorderStyle

export const reactQueryBuilderStyle = css`
  /* Default styles */
  .ruleGroup {
    display: flex;
    flex-direction: column;
    gap: ${rqbSmallSpacing};
    padding: ${rqbSpacing};
    border-color: ${rqbBorderColor};
    border-style: ${rqbBorderStyle};
    border-radius: ${rqbBorderRadius};
    border-width: ${rqbBorderWidth};
    background-color: ${rqbWhiteBackgroundColor};

    .ruleGroup-body {
      display: flex;
      flex-direction: column;
      gap: ${rqbSmallSpacing};

      &:empty {
        display: none;
      }
    }

    .ruleGroup-header,
    .rule {
      display: flex;
      gap: ${rqbSmallSpacing};
      align-items: center;
    }

    .rule {
      flex-wrap: wrap;
      .rule-value {
        .rule-value-list-item:not(:first-of-type) {
          margin-left: ${rqbSmallSpacing};
        }
      }
    }
  }

  /* Drag-and-drop */

  /* Hover styles */
  [data-inlinecombinators='disabled'] {
    .dndOver {
      &.rule,
      &.ruleGroup-header {
        border-bottom-width: ${rqbDndHoverBorderBottomWidth};
        border-bottom-style: ${rqbDndHoverBorderBottomStyle};
        border-bottom-color: ${rqbDndHoverBorderBottomColor};
        padding-bottom: ${rqbDndSpacing};

        &.dndCopy {
          border-bottom-color: ${rqbDndHoverCopyBorderBottomColor};
        }
      }
    }
  }

  [data-inlinecombinators='enabled'] {
    .dndOver {
      &.rule:last-child,
      &.ruleGroup-header,
      &.rule + .betweenRules,
      &.betweenRules {
        border-bottom-width: ${rqbDndHoverBorderBottomWidth};
        border-bottom-style: ${rqbDndHoverBorderBottomStyle};
        border-bottom-color: ${rqbDndHoverCopyBorderBottomColor};
        padding-bottom: ${rqbDndSpacing};

        &.dndCopy {
          border-bottom-color: ${rqbDndHoverCopyBorderBottomColor};
        }
      }
    }
  }

  /* Drag styles */
  .ruleGroup,
  .rule {
    &.dndDragging {
      opacity: 0.5;
    }

    .queryBuilder-dragHandle {
      cursor: move;
    }
  }

  [data-dnd='disabled'] .queryBuilder-dragHandle {
    display: none;
  }

  /* Branches */
  .queryBuilder-branches {
    .ruleGroup-body {
      margin-left: calc(2 * ${rqbBranchIndent});
    }

    .rule,
    .ruleGroup .ruleGroup {
      position: relative;

      &::before,
      &::after {
        content: '';
        width: ${rqbBranchIndent};
        left: -${rqbSmallSpacing};
        border-color: ${rqbBranchColorLight};
        border-style: ${rqbBranchStyle};
        border-radius: ${rqbBranchRadius};
        position: absolute;
      }

      &::before {
        top: -${rqbSmallSpacing};
        height: calc(50% + ${rqbSmallSpacing});
        border-width: 0 0 ${rqbBranchWidth} ${rqbBranchWidth};
      }

      &:last-child::before {
        border-bottom-left-radius: 0;
      }

      &::after {
        top: 50%;
        height: 50%;
        border-width: 0 0 0 ${rqbBranchWidth};
      }

      &:last-child::after {
        display: none;
      }
    }

    .ruleGroup .ruleGroup {
      padding: ${rqbSmallSpacing};

      &::before,
      &::after {
        left: calc(-${rqbSmallSpacing} - ${rqbBranchWidth});
      }

      &::before {
        top: calc(-${rqbSmallSpacing} - ${rqbBorderWidth});
        height: calc(50% + ${rqbSmallSpacing} + ${rqbBorderWidth});
      }

      &::after {
        height: calc(50% + ${rqbBorderWidth});
      }
    }

    .betweenRules {
      position: relative;

      &::before {
        content: '';
        width: ${rqbBranchIndent};
        left: calc(-${rqbBranchIndent} - ${rqbBranchWidth});
        border-color: ${rqbBorderColor};
        border-style: ${rqbBranchStyle};
        border-radius: ${rqbBranchRadius};
        position: absolute;
        top: -${rqbSmallSpacing};
        height: calc(100% + ${rqbSmallSpacing});
        border-width: 0 0 0 ${rqbBranchWidth};
      }
    }
  }
`
