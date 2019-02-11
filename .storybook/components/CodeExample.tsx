import _ from 'lodash'
import React from 'react'
import Editor from './Editor'
import ComponentRenderer from './ComponentRenderer'
import Spacer from '../../components/Spacer'

import { Accordion, Button } from '../../components'

interface Props {
  title: string
  description: string
  code: string
}

const Container = ({
  children,
  style
}: {
  children: React.ReactNode
  style?: any
}) => <div style={{ width: '100%', ...style }}>{children}</div>

const Distribute = ({
  children,
  justify
}: {
  children: React.ReactNode
  justify: 'space-between' | 'space-around' | 'center'
}) => <div style={{ display: 'flex', justifyContent: justify }}>{children}</div>

class CodeExample extends React.Component<Props, {}> {
  state = {
    sourceCode: '',
    isEditorVisible: false
  }

  componentDidMount() {
    const sourceCode = this.getOriginalSourceCode()
    this.setState({ sourceCode })
  }

  getOriginalSourceCode = () => {
    const { code } = this.props
    return require(`!raw-loader!../../components/${code}`)
  }

  handleShowEditor = () => {
    const { isEditorVisible } = this.state
    this.setState({ isEditorVisible: !isEditorVisible })
  }

  handleChangeCode = _.debounce((value: string) => {
    this.setState({ sourceCode: value })
  }, 400)

  render() {
    const { code } = this.props
    const { sourceCode, isEditorVisible } = this.state

    const SourceCodeEditor = (
      <Container style={{ backgroundColor: '#141414', padding: '1em 0' }}>
        <Editor
          id="some-component-example"
          mode="jsx"
          value={sourceCode}
          onChange={this.handleChangeCode}
        />
      </Container>
    )

    return (
      <Container>
        <Distribute justify="space-between">
          <Spacer top={2} bottom={2}>
            <ComponentRenderer sourceCode={sourceCode} exampleCodePath={code} />
          </Spacer>
          <Button variant="flat" size="small" onClick={this.handleShowEditor}>
            Show source code
          </Button>
        </Distribute>
        <Container>
          <Accordion Details={SourceCodeEditor} expanded={isEditorVisible} />
        </Container>
      </Container>
    )
  }
}

export default CodeExample
