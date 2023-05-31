import React, { forwardRef, lazy, Suspense } from 'react'

import LexicalEditorView from '../LexicalEditorView'
import type { Props } from './LexicalEditor'

const LexicalEditor = lazy(() => import('./LexicalEditor'))

const LazyLexicalEditor = forwardRef<HTMLDivElement, Props>(
  function LazyLexicalEditor(props, ref) {
    return (
      <Suspense fallback={<LexicalEditorView />}>
        <LexicalEditor {...props} ref={ref} />
      </Suspense>
    )
  }
)

export default LazyLexicalEditor
