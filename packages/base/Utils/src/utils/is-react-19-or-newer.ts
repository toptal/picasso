import React from 'react'

// React 19 changed how refs work: element refs moved into props, and a
// callback ref may return a cleanup that replaces the call with `null`
export const isReact19OrNewer = Number.parseInt(React.version, 10) >= 19
