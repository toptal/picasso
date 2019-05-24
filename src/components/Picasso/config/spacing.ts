declare module '@material-ui/core/styles/spacing' {
  interface Spacing {
    borderWidth: string
    borderRadius: string
    input: {
      height: string
      width: string
      padding: string
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

const spacing = {
  borderWidth: '1px',
  borderRadius: '3px',
  input: {
    height: '2.25em',
    width: '18.75em',
    padding: '.625em'
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

export default spacing
