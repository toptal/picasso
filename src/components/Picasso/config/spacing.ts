import { em } from '../../styles'

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
    height: em('36px'), // '2.25em',
    width: em('300px'), // '18.75em',
    padding: em('10px') // '.625em'
  },
  inputLabel: {
    height: '1em'
  },
  inputIcon: {
    width: '1em'
  }
}

export default spacing
