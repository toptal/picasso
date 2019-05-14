declare module '@material-ui/core/styles/shape' {
  interface Shape {
    borderWidth: string
    input: {
      height: string
      width: string
      paddingTop: string
      paddingRight: string
      paddingBottom: string
      paddingLeft: string
    }
    inputLabel: {
      height: string
      shrinkPaddingTop: string
      shrinkScale: number
    }
    inputIcon: {
      width: string
    }
  }
}

const shape = {
  borderWidth: '1px',
  input: {
    height: '3em',
    width: '17.5em',
    paddingTop: '.8em',
    paddingRight: '.7em',
    paddingBottom: '.8em',
    paddingLeft: '.7em'
  },
  inputLabel: {
    height: '1em',
    shrinkPaddingTop: '.4em',
    shrinkScale: 0.75
  },
  inputIcon: {
    width: '1em'
  }
}

export default shape
