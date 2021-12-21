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
      height: 'calc(100% - 43px)',
      '& .ql-formats': {
        display: 'inline-block',
        verticalAlign: 'middle',
        position: 'relative',
        paddingRight: '8px',
        marginRight: '8px',
        // borderRight: '1px solid grey'

        '&:not(:last-child)::after': {
          content: '""!important',
          height: '16px',
          width: '1px',
          position: 'absolute',
          right: 0,
          top: '4px',
          // backgroundColor: palette.grey.lighter2
          backgroundColor: 'black'
        }
      },
      '& .ql-picker-label': {
        border: `1px solid ${palette.grey.light2}`,
        borderRadius: '4px',

        '& svg': {
          width: '0 !important'
        },

        '&::before': {
          color: palette.common.black,
          fontSize: '12px',
          fontWeight: 'normal',
          lineHeight: '16px',
          height: '16px'
        },

        '&::after': {
          // backgroundImage: `url("data:image/svg+xml;utf8,${Email16}")`,
          // backgroundImage: `url(${Email16})`,
          // top: '50%',
          right: 0,
          content: '"WTF"!important',
          position: 'absolute'
        }
      },
      // '& .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg': {
      //   position: 'absolute',
      //   marginTop: '-9px',
      //   right: 0,
      //   top: '50%',
      //   width: '18px'
      // }
      ...listStyles,
      ...margins
    }
  })
