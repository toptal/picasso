export default ({ typography }: { typography: any }) => ({
  root: {
    '& *': {
      fontFamily: typography.fontFamily
    },
    '& svg': {
      fill: 'currentColor',
      display: 'inline-block',
      fontSize: 'inherit',
      height: '1em'
    }
  }
})
