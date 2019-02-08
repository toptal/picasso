import _ from 'lodash'
import React from 'react'
import Editor from './Editor'
import ComponentRenderer from './ComponentRenderer'
import Spacer from '../../components/Spacer'

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

class CodeExample extends React.Component<Props, {}> {
  state = {
    sourceCode: ''
  }

  componentDidMount() {
    const sourceCode = this.getOriginalSourceCode()
    this.setState({ sourceCode })
  }

  getOriginalSourceCode = () => {
    const { code } = this.props
    return require(`!raw-loader!../../components/${code}`)
  }

  handleChangeCode = _.debounce((value: string) => {
    this.setState({ sourceCode: value })
  }, 400)

  render() {
    const { code } = this.props
    const { sourceCode } = this.state

    return (
      <Container>
        <Spacer top={2} bottom={2}>
          <ComponentRenderer sourceCode={sourceCode} exampleCodePath={code} />
        </Spacer>
        <Container style={{ backgroundColor: '#141414', padding: '1em 0' }}>
          <Editor
            id="some-component-example"
            mode="jsx"
            value={sourceCode}
            onChange={this.handleChangeCode}
          />
        </Container>
      </Container>
    )
  }
}

export default CodeExample
