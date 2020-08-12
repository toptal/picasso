export interface Sizes {
  borderWidth: string
  borderRadius: {
    small: string
    medium: string
  }
  input: {
    height: string
    width: string
    padding: string
  }
}

const sizes = {
  borderWidth: '1px',
  borderRadius: {
    small: '3px',
    medium: '8px'
  },
  input: {
    height: '2.25rem',
    width: '18.75rem',
    padding: '0.625rem'
  }
}

export default sizes
