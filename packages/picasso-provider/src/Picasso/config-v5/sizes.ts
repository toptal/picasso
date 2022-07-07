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
    small: '4px',
    medium: '8px',
  },
  input: {
    height: '2rem',
    width: '18.75rem',
    padding: '0.5rem',
  },
}

export default sizes
