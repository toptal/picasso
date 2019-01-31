export default ({ typography }: { typography: any }) => ({
  '@global svg': {
    fill: 'currentColor'
  },
  root: {
    '& *': {
      fontFamily: typography.fontFamily
    }
  }
})
