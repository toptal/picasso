import React from 'react'

import Markdown from '.storybook/components/Markdown'

interface Props {
  description: string
  propName?: string
}

const Description = ({ description, propName }: Props): JSX.Element => {
  if (!description) {
    window.console.warn(`Failed to parse description for '${propName}'`)
  }

  return <Markdown>{description}</Markdown>
}

export default Description
