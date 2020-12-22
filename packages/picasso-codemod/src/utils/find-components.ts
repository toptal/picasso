/* eslint-disable id-length */
import { Core, JSCodeshift } from 'jscodeshift'

const findComponents = (
  componentName: string,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  // we need a special check for elements with dot. e.g. Page.Header
  const IS_DOT_NOTATION = componentName.includes('.')

  if (IS_DOT_NOTATION) {
    const [objectName, propertyName] = componentName.split('.')

    return root.find(j.JSXElement, {
      openingElement: {
        name: { object: { name: objectName }, property: { name: propertyName } }
      }
    })
  }

  return root.findJSXElements(componentName)
}

export { findComponents }
