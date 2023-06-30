import React, { forwardRef, lazy, Suspense } from 'react'

import EditorView from '../plugins/EditorView'
import type { Props } from './LexicalEditor'

const LexicalEditor = lazy(() => import('./LexicalEditor'))

const LazyLexicalEditor = forwardRef<HTMLDivElement, Props>(
  function LazyLexicalEditor(props, ref) {
    return (
      <Suspense fallback={<EditorView />}>
        <LexicalEditor {...props} ref={ref} />
      </Suspense>
    )
  }
)

export default LazyLexicalEditor
