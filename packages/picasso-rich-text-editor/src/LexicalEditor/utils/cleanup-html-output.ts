enum NodeTypes {
  Parent = 'parent',
  Child = 'child',
}

interface ReplaceCondition {
  parentTag: string
  childTag: string
  nodeToRemove: NodeTypes
}

const replacementMap: ReplaceCondition[] = [
  { parentTag: 'i', childTag: 'em', nodeToRemove: NodeTypes.Parent },
  { parentTag: 'b', childTag: 'strong', nodeToRemove: NodeTypes.Parent },
  { parentTag: 'p', childTag: 'span', nodeToRemove: NodeTypes.Child },
  { parentTag: 'pre', childTag: 'span', nodeToRemove: NodeTypes.Child },
  { parentTag: 'code', childTag: 'span', nodeToRemove: NodeTypes.Child },
  { parentTag: 'h3', childTag: 'span', nodeToRemove: NodeTypes.Child },
  { parentTag: 'li', childTag: 'span', nodeToRemove: NodeTypes.Child },
]

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

const removeExtraTags = (htmlDoc: Document): Document => {
  replacementMap.forEach(replacementRule => {
    const { parentTag, childTag, nodeToRemove } = replacementRule

    handleElements(htmlDoc, childTag, element => {
      const elementParentTag =
        element.parentElement?.tagName.toLocaleLowerCase()

      if (
        element.tagName.toLowerCase() === childTag &&
        elementParentTag === parentTag
      ) {
        if (nodeToRemove === NodeTypes.Parent) {
          removeParent(element)
        }

        if (nodeToRemove === NodeTypes.Child) {
          removeChild(element)
        }
      }
    })
  })

  return htmlDoc
}

const handleElements = (
  htmlDoc: Document,
  tag: string,
  callback: (element: Element) => void
): Document => {
  const elements = Array.from(htmlDoc.getElementsByTagName(tag))

  elements.forEach(callback)

  return htmlDoc
}

const replaceItalicTag = (htmlDoc: Document): Document => {
  const newTag = 'em'

  handleElements(htmlDoc, 'i', oldElement => {
    const newElement = htmlDoc.createElement(newTag)

    while (oldElement.firstChild) {
      newElement.appendChild(oldElement.firstChild)
    }

    if (oldElement.parentNode) {
      oldElement.parentNode.replaceChild(newElement, oldElement)
    }
  })

  return htmlDoc
}

const hoistNestedLists = (htmlDoc: Document): Document => {
  htmlDoc.querySelectorAll('li>ul,li>ol').forEach(list => {
    const currentLi = list.parentNode as Element

    if (currentLi?.children.length === 1) {
      const previousLi = currentLi.previousElementSibling

      if (previousLi) {
        currentLi.removeChild(list)
        previousLi.appendChild(list)
        currentLi?.parentNode?.removeChild(currentLi)
      }
    }
  })

  return htmlDoc
}

export const cleanupHtmlOutput = (html: string): string => {
  const parser = new DOMParser()

  const htmlDoc = parser.parseFromString(html, 'text/html')

  const [newHtml] = [htmlDoc]
    .map(removeExtraTags)
    .map(replaceItalicTag)
    .map(hoistNestedLists)

  const result = newHtml.body.innerHTML

  return result
}
