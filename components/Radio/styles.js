const centeredCircle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  content: '""',
  borderColor: 'inherit',
  background: '#fff',
  pointerEvents: 'none',
  transition: 'border-color',
  transitionDuration: 'inherit',
  transitionTimingFunction: 'inherit'
}

export default {
  Radio: {
    '@keyframes fade-in': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    icon: {
      '&:before': {
        ...centeredCircle,
        border: '1px solid #000'
      },
      '&:after': {
        ...centeredCircle,
        width: 'initial',
        height: 'initial',
        borderWidth: '0.25em',
        borderStyle: 'solid',
        display: 'none',
        animation: 'fade-in',
        animationDuration: 'inherit',
        animationTimingFunction: 'inherit'
      }
    }
  }
}
