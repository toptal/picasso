declare module '@material-ui/core/styles/spacing' {
  interface Spacing {
    borderWidth: string
    borderRadius: string
    input: {
      height: string
      width: string
      padding: string
    }
  }
}

const spacing = {
  borderWidth: '1px',
  borderRadius: '3px',
  input: {
    height: '2.25em',
    width: '18.75em',
    padding: '0.625em'
  }
}

export default spacing
