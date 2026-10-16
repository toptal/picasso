import React from 'react'

export const replaceLineBreaksWithTags = (
  children: string
): string | (React.ReactElement | React.ReactElement[])[] => {
  const textChunks = children.split('\n')

  if (textChunks.length <= 1) {
    return children
  }

  return textChunks.map((line, index, { length }) => {
    // eslint-disable-next-line react/no-array-index-key
    const newLine = <span key={index + 'span'}>{line}</span>

    if (index === length - 1) {
      return newLine
    }

    // eslint-disable-next-line react/no-array-index-key
    return [newLine, <br key={index + 'br'} />]
  })
}
