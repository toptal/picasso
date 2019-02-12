import React from 'react'
import _ from 'lodash'

import CodeRenderer from '../../utils/codeRenderer'
import Typography from '../../../components/Typography'

interface Props {
  exampleCodePath: string
  sourceCode: string
}

class ComponentRenderer extends React.Component<Props, {}> {
  state = {
    error: null,
    exampleComponent: null
  }
  codeRenderer = new CodeRenderer()

  componentDidMount() {
    const { sourceCode } = this.props
    this.renderSourceCode(sourceCode)
  }

  componentDidCatch(error: Error) {
    // very important here to reset exampleComponent to null
    // because if you are missing any import in the source code
    // for any of your React components - it's still valid code
    // for `eval`, but not valid component to render, so if you
    // re-render it again with not valid component - it will fire React error
    this.setState({ error: error.message, exampleComponent: null })
  }

  componentDidUpdate(prevProps: Props) {
    const { sourceCode } = this.props
    if (sourceCode === prevProps.sourceCode) {
      return
    }

    this.renderSourceCode(sourceCode)
  }

  getComponentBaseFolder = () => {
    const { exampleCodePath } = this.props

    // exampleCodePath: SomeComponent/SomeComponent.tsx
    // so base folder: SomeComponent
    return exampleCodePath.split('/')[0]
  }

  renderSourceCode = (sourceCode: string) => {
    try {
      const componentFolder = this.getComponentBaseFolder()
      const exampleComponent = this.codeRenderer.compileCodeIntoComponent(
        sourceCode,
        componentFolder
      )
      this.setState({ exampleComponent, error: null })
    } catch (err) {
      this.setState({ exampleComponent: null, error: err.message })
    }
  }

  render() {
    const { error, exampleComponent } = this.state

    if (error) {
      return (
        <Typography weight="regular" variant="large">
          {error}
        </Typography>
      )
    }

    return exampleComponent
  }
}

export default ComponentRenderer
