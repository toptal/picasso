declare module '@material-ui/core/styles/spacing' {
  interface Spacing {
    borderWidth: string
    input: {
      paddingTop: string
      paddingRight: string
      paddingBottom: string
      paddingLeft: string
    }
    inputLabel: {
      height: string
    }
  }
}

const spacing = {
  borderWidth: '1px',
  input: {
    paddingTop: '.8em',
    paddingRight: '.7em',
    paddingBottom: '.8em',
    paddingLeft: '.7em'
  },
  inputLabel: {
    height: '.4em'
  }
}

export default spacing
