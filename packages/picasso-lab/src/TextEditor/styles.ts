import { createStyles, Theme } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared/styles'

const margins = {
  '& p': {
    margin: '0.5rem 0'
  },
  '& h3': {
    margin: '1rem 0 0.5rem'
  },
  '& p:first-child, & h3:first-child': {
    margin: '0 0 0.5rem'
  },
  '& li:not(:last-child)': {
    margin: '0 0 0.5rem'
  },
  '& ol, & ul': {
    padding: 0,
    margin: '0.5rem 0'
  }
}

const listStyles = {
  '& li': {
    listStyleType: 'none',
    paddingLeft: '2rem',
    position: 'relative',
    '&:before': {
      display: 'inline-block',
      position: 'absolute',
      left: 0,
      whiteSpace: 'nowrap',
      width: '1rem'
    }
  },
  '& ol li': {
    counterIncrement: 'list-0',
    '&:before': {
      content: 'counter(list-0, decimal) "."'
    }
  },
  '& *:not(li)': {
    counterReset: 'list-0'
  },
  '& ul li': {
    '&:before': {
      content: '""',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M8 6c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2 .8954-2 2-2Z' id='a'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cuse fill='%23979797' fill-rule='nonzero' xlink:href='%23a'/%3E%3Cg mask='url(%23b)' fill='%23455065'%3E%3Cpath d='M0 0h16v16H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: rem('22px'),
      width: '1rem'
    }
  }
}

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      height: '12.5em',
      overflowY: 'hidden',
      resize: 'vertical',
      ...listStyles,
      ...margins
    },

    editorWrapper: {
      borderRadius: '0.25em',
      border: `1px solid ${palette.grey.light2}`,
      padding: '0.5em'
    },

    qlToolbar: {
      display: 'flex',
      borderBottom: `1px solid ${palette.grey.light2}`,
      paddingBottom: '0.5em'
    },

    qlFormats: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',

      '&:not(:last-child)::after': {
        content: '""',
        height: '1em',
        width: '1px',
        position: 'relative',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        backgroundColor: palette.grey.lighter2
      }
    },

    textStylesSelect: {
      width: '7.125em'
    },

    button: {
      borderRadius: '0.25em !important',

      '&+&': {
        marginLeft: '0.5em'
      }
    },
    activeButton: {
      backgroundColor: `${palette.grey.dark} !important`,

      '& svg': {
        fill: palette.common.white
      }
    }
  })
