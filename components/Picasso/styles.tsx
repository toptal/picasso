export default ({ typography }: { typography: any }) => ({
  root: {
    height: '100%',

    '& *': {
      fontFamily: typography.fontFamily
    }
  }
})
