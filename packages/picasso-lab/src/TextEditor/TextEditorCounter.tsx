import React from 'react'

type Props = {
  counterState?: any
}

const TextEditorCounter = (props: Props) => {
  const { counterState } = props

  const [numOfCharsLeft] = counterState

  return <div>{numOfCharsLeft}</div>
}

export default TextEditorCounter
