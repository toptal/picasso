const purifyFixedPosition = (exampleContainerElement: HTMLElement) => {
  const elements = exampleContainerElement.getElementsByTagName('*')

  Array.from(elements)
    .filter(element => {
      const style = window.getComputedStyle(element)
      return style.getPropertyValue('position') === 'fixed'
    })
    .forEach(element => {
      const htmlElement = element as HTMLElement
      //htmlElement.style.position = 'absolute'
    })
}

export default purifyFixedPosition
