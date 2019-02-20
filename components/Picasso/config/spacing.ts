declare module '@material-ui/core/styles/spacing' {
  interface Spacing {
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
  }
}

const spacing = {
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
    height: '.8em',
    shrinkPaddingTop: '.3em',
    shrinkScale: 0.75
  }
}

export default spacing
