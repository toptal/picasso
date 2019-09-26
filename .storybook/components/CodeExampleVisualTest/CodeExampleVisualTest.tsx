import React, { Component, FunctionComponent, useLayoutEffect } from 'react'
import Picasso from '@components'
import { useScreenSize } from '@components/utils'

import purifyFixedPosition from '../../utils/purify-fixed-position'

interface Props {
  src: string
}

const Purifier: FunctionComponent = ({ children }) => {
  const sourceRendererRef = React.createRef<HTMLDivElement>()

  const screenSize = useScreenSize()

  useLayoutEffect(() => {
    if (!sourceRendererRef.current) {
      return
    }

    purifyFixedPosition(sourceRendererRef.current)
  }, [sourceRendererRef, screenSize])

  return <div ref={sourceRendererRef}>{children}</div>
}

class CodeExampleVisualTest extends Component<Props> {
  getComponent = () => {
    const { src } = this.props

    try {
      return () => import(`@components/${src}`)
    } catch (e) {
      return () => import(`~/.storybook/stories/${src}`)
    }
  }

  render() {
    const Component = React.lazy(this.getComponent())

    return (
      <Picasso loadFonts={false}>
        <Purifier>
          <React.Suspense fallback={null}>
            <Component />
          </React.Suspense>
        </Purifier>
      </Picasso>
    )
  }
}

export default CodeExampleVisualTest
