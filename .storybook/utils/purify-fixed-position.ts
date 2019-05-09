const purifyFixedPosition = (exampleContainerElement: HTMLElement) => {
  const elements = exampleContainerElement.getElementsByTagName('*')

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement
    const style = window.getComputedStyle(element)

    if (style.getPropertyValue('position') === 'fixed') {
      element.style.position = 'absolute'
    }
  }
}

export default purifyFixedPosition
