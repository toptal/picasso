const quillDecodeIndent = (text: string): string => {
  if (!text) {
    return text
  }

  const wrapper = document.createElement('div')

  wrapper.innerHTML = text

  const listTypes = ['ul', 'ol'] as const

  listTypes.forEach(type => {
    const lists = wrapper.querySelectorAll<HTMLElement>(type)

    lists.forEach(list => {
      const items = Array.from(list.children).filter(
        (el): el is HTMLLIElement => el.tagName === 'LI'
      )

      let prevLevel = 0
      let currParent = list

      items.forEach(item => {
        const currLevel = +item.className.replace(/\D+/g, '')

        item.classList.remove(`ql-indent-${currLevel}`)

        if (currLevel > prevLevel) {
          const newParent = document.createElement(type)

          if (currParent.lastChild != item) {
            currParent.lastChild?.appendChild(newParent)
            currParent = newParent
            currParent?.appendChild(item)
          }
        } else if (currLevel < prevLevel) {
          for (let index = 0; index < prevLevel - currLevel; index++) {
            currParent?.parentNode?.parentNode?.appendChild(item) as HTMLElement
          }
        } else {
          currParent?.appendChild(item)
        }

        prevLevel = currLevel
      })
    })
  })

  return wrapper.innerHTML
}

export default quillDecodeIndent
