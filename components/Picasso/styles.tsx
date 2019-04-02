export default ({ typography }: { typography: any }) => ({
  root: {
    height: '100vh',

    '& *': {
      fontFamily: typography.fontFamily
    }
  }
})
