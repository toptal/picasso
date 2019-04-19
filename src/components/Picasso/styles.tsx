export default ({ typography }: { typography: any }) => ({
  root: {
    minHeight: '100%',

    '& *': {
      fontFamily: typography.fontFamily
    }
  }
})
