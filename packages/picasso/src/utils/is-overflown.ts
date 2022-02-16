const paddingOnClient = 1

const isOverflown = (element: HTMLElement) => {
  const { scrollWidth, clientWidth, scrollHeight, clientHeight } = element

  return (
    scrollWidth > clientWidth - paddingOnClient || scrollHeight > clientHeight
  )
}

export default isOverflown
