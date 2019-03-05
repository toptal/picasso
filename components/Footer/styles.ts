import { Theme } from '@material-ui/core/styles'

export default ({ palette, screens, layout }: Theme) => ({
  root: {
    backgroundColor: palette.grey[500]
  },
  content: {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: layout.contentWidth,
    margin: '0 auto',
    padding: `0.5rem ${layout.contentPaddingHorizontal} 3.625rem`,

    color: palette.common.white,
    fontSize: '0.875rem',
    lineHeight: '1em',

    [screens('small', 'medium', 'large')]: {
      flexDirection: 'column' as 'column'
    }
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',

    [screens('small', 'medium', 'large')]: {
      order: -1
    }
  }
})
