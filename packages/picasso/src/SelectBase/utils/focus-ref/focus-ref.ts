const focusRef = <T extends HTMLElement>(ref: React.Ref<T> | undefined) => {
  if (typeof ref === 'object' && ref?.current) {
    ref.current.focus()
  }
}

export default focusRef
