export default ({ typography }: { typography: any }) => ({
  root: {
    '& *': {
      fontFamily: typography.fontFamily
    }
  }
})
