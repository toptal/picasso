const preventDefaultHandler: (this: Element, event: Event) => void = event => {
  event.preventDefault()
}

export default preventDefaultHandler
