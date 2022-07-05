import createStyles from '@mui/styles/createStyles';

// --- need to move to shared config
export const headerHeight = { default: '4.5rem', smallAndMedium: '3rem' }

const collapse = {
  container: '& > div',
  wrapper: '& > div > div',
}

export default createStyles({
  root: {
    [collapse.container]: {
      pointerEvents: 'all',
    },
    [collapse.wrapper]: {
      padding: `6px 0px`,
      transition: 'padding 300ms ease 0ms',
    },
  },
  rootWithMargin: {
    marginTop: headerHeight.default,
  },
})
