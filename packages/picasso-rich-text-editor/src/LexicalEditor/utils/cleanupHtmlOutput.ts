enum NodeTypes {
  Parent = 'parent',
  Child = 'child',
}

const removeParent = (element: Node) => {
  const parent = element.parentNode

  if (parent) {
    parent.parentNode!.insertBefore(element, parent)
    parent.parentNode!.removeChild(parent)
  }
}

const removeChild = (element: Node) => {
  while (element.firstChild) {
    if (element.parentNode) {
      element.parentNode.insertBefore(element.firstChild, element)
    }
  }

  element.parentNode!.removeChild(element)
}

export const removeExtraTags = (htmlDoc: Document): Document => {
  const childConditions = [
    { parent: 'i', child: 'em', nodeToRemove: NodeTypes.Parent },
    { parent: 'b', child: 'strong', nodeToRemove: NodeTypes.Parent },
    { parent: ['p', 'h3', 'li'], child: 'span', nodeToRemove: NodeTypes.Child },
  ]

  childConditions.forEach(({ parent, child, nodeToRemove }) => {
    const parents = Array.isArray(parent) ? parent : [parent]

    parents.forEach(parentTag => {
      const parentElements = htmlDoc.getElementsByTagName(parentTag)

      for (
        let parentIndex = 0;
        parentIndex < parentElements.length;
        parentIndex++
      ) {
        const parent = parentElements[parentIndex]

        for (
          let childIndex = 0;
          childIndex < parent.childElementCount;
          childIndex++
        ) {
          if (parent.children[childIndex].tagName.toLowerCase() === child) {
            const child = parent.children[childIndex]

            if (nodeToRemove === NodeTypes.Parent) {
              removeParent(child)
            }

            if (nodeToRemove === NodeTypes.Child) {
              removeChild(child)
            }
          }
        }
      }
    })
  })

  return htmlDoc
}

const replaceTags = (
  htmlDoc: Document,
  oldTag: string,
  newTag: string
): Document => {
  const elements = htmlDoc.getElementsByTagName(oldTag)

  for (let index = 0; index < elements.length; index++) {
    const oldElement = elements[index]
    const newElement = htmlDoc.createElement(newTag)

    while (oldElement.firstChild) {
      newElement.appendChild(oldElement.firstChild)
    }

    oldElement.parentNode!.replaceChild(newElement, oldElement)
  }

  return htmlDoc
}

export const cleanupHtmlOutput = (html: string): string => {
  const parser = new DOMParser()
  let htmlDoc = parser.parseFromString(html, 'text/html')

  htmlDoc = replaceTags(removeExtraTags(htmlDoc), 'i', 'em')

  return htmlDoc.body.innerHTML
}
