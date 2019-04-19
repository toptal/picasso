export default ({ typography }: { typography: any }) => ({
  root: {
    flex: 1,

    '& *': {
      fontFamily: typography.fontFamily
    }
  }
})
