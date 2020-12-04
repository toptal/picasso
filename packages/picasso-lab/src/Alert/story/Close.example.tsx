import React from 'react'
import { Alert } from '@toptal/picasso-lab'

const mockOnClose = () => {
  window.alert("You've clicked the close icon.")
}

const Example = () => (
  <Alert onClose={mockOnClose}>
    Enim dolore enim consequat dolor sunt tempor et aliqua amet ex sit laboris
    consequat cupidatat. Veniam irure do consequat officia. Tempor tempor duis
    est Lorem. Voluptate nisi labore elit velit do eu. Culpa officia aliquip
    dolor occaecat labore quis id proident aliquip. Consectetur dolor laboris
    labore nulla ex excepteur qui incididunt fugiat. Consectetur excepteur
    exercitation ullamco elit aliquip culpa velit minim aliqua qui ea ut. Magna
    ipsum aute sint dolor veniam qui ad. Ad adipisicing duis deserunt Lorem
    consectetur fugiat excepteur id occaecat sit reprehenderit amet. Nisi Lorem
    nostrud adipisicing Lorem aliquip deserunt irure. Eu duis aliquip in amet
    cillum est. Mollit veniam commodo veniam anim tempor tempor tempor ut.
    Labore irure est aliquip nisi adipisicing pariatur enim sunt cillum ullamco
    Lorem nulla.
  </Alert>
)

export default Example
