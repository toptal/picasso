import { createStyles } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core/styles'
import type { CSSProperties } from '@material-ui/core/styles/withStyles'
import { rem } from '@toptal/picasso-shared'

import { codeBlockStyles, codeStyles } from '../RichText/components/styles'

const margins = {
  '& p, & code[dir]': {
    margin: '0.5rem 0',
  },
  '& h3': {
    margin: '1rem 0 0.5rem',
  },
  '& p:first-child, & h3:first-child, & code[dir]:first-child': {
    margin: '0 0 0.5rem',
  },
  '& li:not(:last-child)': {
    margin: '0 0 0.5rem',
  },
  '& ol, & ul': {
    padding: 0,
    margin: '0.5rem 0',
  },
}

const outlinedBullet = `url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 9c.55228 0 1-.44772 1-1s-.44772-1-1-1-1 .44772-1 1 .44772 1 1 1Zm0 1c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2Z' fill='%23455065'/%3E%3C/svg%3E")`
const bullet = `url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='2' fill='%23455065'/%3E%3C/svg%3E");`

enum IndentLevels {
  Decimal = 4,
  LowerRoman = 3,
  LowerAlpha2 = 2,
  LowerAlpha5 = 5,
}
const orderedContent = (indent: number): string => {
  switch (indent) {
    case IndentLevels.Decimal:
      return `counter(list-${indent}, decimal) "."`
    case IndentLevels.LowerRoman:
      return `counter(list-${indent}, lower-roman) "."`
    case IndentLevels.LowerAlpha2:
    case IndentLevels.LowerAlpha5:
      return `counter(list-${indent}, lower-alpha) "."`
    default:
      return ''
  }
}

const indentStyles = [2, 3, 4, 5].reduce(
  (acc: { [key: string]: CSSProperties }, indent: number) => {
    const olItem = `& ol.indent-level-${indent} > li:not(.nested-list-item)`
    const olItemBefore = `${olItem}:before`
    const ulItemBefore = `& ul.indent-level-${indent} > li:not(.nested-list-item):before`

    acc[olItem] = {
      counterIncrement: `list-${indent}`,
    }
    acc[olItemBefore] = {
      content: orderedContent(indent),
    }
    if (indent % 2 === 0) {
      acc[ulItemBefore] = {
        backgroundImage: outlinedBullet,
      }
    }

    return acc
  },
  {}
)

const listStyles = {
  '& p,& ol,& ul,& pre,& blockquote,& h1,& h2,& h3,& h4,& h5,& h6': {
    counterReset:
      'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
  },
  '& *:not(li)': {
    counterReset: 'list-0',
  },
  ...indentStyles,
}

export default (theme: Theme) => {
  const { typography } = theme

  return createStyles({
    editorContainer: {
      height: '12.5em',
      overflowY: 'hidden',
      resize: 'vertical',
      position: 'relative',
      fontSize: '14px',
      ...listStyles,
      ...margins,
    },

    contentEditable: {
      outline: 'none',
      height: '100%',
      padding: '1em 0.5em',
      tabSize: 4,
      overflowY: 'auto',
    },

    placeholder: {
      overflow: 'hidden',
      position: 'absolute',
      textOverflow: 'ellipsis',
      top: '0px',
      left: '0px',
      userSelect: 'none',
      whiteSpace: 'normal',
      display: 'inline-block',
      pointerEvents: 'none',
    },

    paragraph: {
      margin: '0 0 0.5rem',
    },

    listItem: {
      listStyleType: 'none',
      paddingLeft: '1.5rem',
      position: 'relative',
      '&:before': {
        display: 'inline-block',
        position: 'absolute',
        left: 0,
        whiteSpace: 'nowrap',
        width: '1rem',
      },
    },
    ol: {
      '& > li:not(.nested-list-item)': {
        counterIncrement: 'list-0',
        '&:before': {
          content: 'counter(list-0, decimal) "."',
        },
      },
    },
    ul: {
      '& > li:not(.nested-list-item)': {
        '&:before': {
          content: '""',
          backgroundImage: bullet,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: rem('22px'),
          width: '1rem',
        },
      },
    },
    bold: {
      fontWeight: typography.fontWeights.semibold,
    },
    italic: {
      fontStyle: 'italic',
    },
    customEmoji: {
      '& > img': {
        verticalAlign: 'bottom',
        width: '22px',
        height: '22px',
      },
    },
    code: codeStyles(theme),
    codeBlock: {
      '&': codeBlockStyles(theme),
      '& *': {
        fontFamily: 'monospace',
      },
    },
    codeBlockText: {
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      color: 'inherit',
    },
  })
}
