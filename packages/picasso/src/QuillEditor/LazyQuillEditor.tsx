import React, { forwardRef, lazy, Suspense } from 'react'

import QuillEditorOutput from '../QuillEditorOutput'
import type { Props } from './QuillEditor'

const QuillEditor = lazy(() => import('./QuillEditor'))

const LazyQuillEditor = forwardRef<HTMLDivElement, Props>(
  function LazyQuillEditor(props, ref) {
    return (
      <Suspense fallback={<QuillEditorOutput />}>
        <QuillEditor {...props} ref={ref} />
      </Suspense>
    )
  }
)

export default LazyQuillEditor
