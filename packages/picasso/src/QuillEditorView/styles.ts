import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { createStyles, Theme } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const margins = {
  '& p': {
    margin: '0.5rem 0',
  },
  '& h3': {
    margin: '1rem 0 0.5rem',
  },
  '& p:first-child, & h3:first-child': {
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

const orderedContent = (indent: number) => {
  const decimalContent = [3, 6, 9]
  const lowerRomanContent = [2, 5, 8]
  const lowerAlphaContent = [1, 4, 7]

  if (decimalContent.includes(indent)) {
    return `counter(list-${indent}, decimal) "."`
  }

  if (lowerRomanContent.includes(indent)) {
    return `counter(list-${indent}, lower-roman) "."`
  }

  if (lowerAlphaContent.includes(indent)) {
    return `counter(list-${indent}, lower-alpha) "."`
  }
}

const unorderedContent = (indent: number) => {
  if (indent % 2 === 0) {
    return bullet
  }

  return outlinedBullet
}

const indentStyles = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
  (acc: { [key: string]: CSSProperties }, indent: number) => {
    acc[`& .ql-indent-${indent}`] = {
      paddingLeft: `${1.5 + 1.5 * indent}rem`,
    }

    acc[`& .ql-indent-${indent}:before`] = {
      left: `${1.5 * indent}rem`,
    }

    acc[`& ol li.ql-indent-${indent}`] = {
      counterIncrement: `list-${indent}`,
    }

    acc[`& ol li.ql-indent-${indent}:before`] = {
      content: orderedContent(indent),
    }

    acc[`& ul li.ql-indent-${indent}:before`] = {
      backgroundImage: unorderedContent(indent),
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
  '& li': {
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
  '& ol li': {
    counterIncrement: 'list-0',
    '&:before': {
      content: 'counter(list-0, decimal) "."',
    },
  },
  '& *:not(li)': {
    counterReset: 'list-0',
  },
  '& ul li': {
    '&:before': {
      content: '""',
      backgroundImage: bullet,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: rem('22px'),
      width: '1rem',
    },
  },
  ...indentStyles,
}

const horizontalPadding = '0.5em'
const placeholder = ({ palette }: Theme) => ({
  '& .ql-blank:before': {
    color: palette.grey.main2,
    content: 'attr(data-placeholder)',
    pointerEvents: 'none',
    position: 'absolute',
    left: horizontalPadding,
    right: horizontalPadding,
  },
})

const hidden = {
  '& .gl-hidden': {
    display: 'none',
  },
}

const editor = {
  '& .ql-editor': {
    height: '100%',
    outline: 'none',
    overflowY: 'auto',
    padding: `1em ${horizontalPadding}`,
    tabSize: '4',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  '& .ql-editor > *': {
    cursor: 'text',
  },
}

const clipboard = {
  '& .ql-clipboard': {
    left: '-100000px',
    height: '1px',
    overflowY: 'hidden',
    position: 'absolute',
    top: '50%',
  },
}

const quillSpecificStyles = (theme: Theme) => ({
  ...placeholder(theme),
  ...editor,
  ...hidden,
  ...clipboard,
})

export default (theme: Theme) => {
  return createStyles({
    root: {
      height: '12.5em',
      overflowY: 'hidden',
      resize: 'vertical',
      position: 'relative',
      ...listStyles,
      ...margins,
      ...quillSpecificStyles(theme),
    },
  })
}
