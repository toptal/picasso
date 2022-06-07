import React from 'react'
import { FileInput } from '@toptal/picasso'

const Example = () => (
  <FileInput
    buttonLabel="I'm a custom button"
    renderButton={({ label, onClick, disabled }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{ cursor: 'pointer' }}
      >
        {label}
      </button>
    )}
    hint='Max file size: 25MB'
  />
)

export default Example
