import createStyles from '@mui/styles/createStyles'

// --- need to move to shared config
export const headerHeight = { default: '4.5rem', smallAndMedium: '3rem' }

export default createStyles({
  rootWithMargin: {
    marginTop: headerHeight.default
  },
  marginWithDrawer: {
    marginRight: '27.5rem'
  }
})
