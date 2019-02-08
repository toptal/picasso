import React from 'react'
import { withStyles } from '@material-ui/core/styles'

interface Props {
  text: string
  classes: Record<string, string>
}

const SomeComponent: React.FunctionComponent<Props> = ({ classes, text }) => {
  const root = classes.root

  return <div className={root}>{text}</div>
}

export default withStyles({
  root: {
    fontSize: '24px'
  }
})(SomeComponent)
