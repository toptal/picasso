declare var TEST_ENV: string // defined by ENV

import _ from 'lodash'
import React, { ReactNode, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconCode from '@material-ui/icons/Code'
import IconLink from '@material-ui/icons/Link'
import SourceRender from 'react-source-render'
import copy from 'copy-to-clipboard'

import { RenderResult } from '~/@types/react-source-render'
import { Classes } from '@components/styles/types'
import Picasso, { Typography, Button, Accordion, Container } from '@components'

import Editor from '../Editor'
import styles from './styles'

const COPY_LINK_DEFAULT_TEXT = 'Link'
const COPY_LINK_COPIED_TEXT = 'Copied!'

interface Props {
  classes: Classes
  permanentLink: string
  src: string
}

const imports: {
  [key: string]: object
} = {
  react: React,
  '@toptal/picasso': require('@components'),
  '@toptal/picasso/Icons': require('@components/Icon')
}

const resolver = (path: string) => imports[path]

class CodeExample extends Component<Props> {
  state = {
    sourceCode: '',
    isEditorVisible: false,
    copyLinkButtonText: COPY_LINK_DEFAULT_TEXT
  }
  copyLinkButtonRef = React.createRef<HTMLElement>()

  componentDidMount() {
    const sourceCode = this.getOriginalSourceCode()
    this.setState({ sourceCode })
  }

  getOriginalSourceCode = () => {
    const { src } = this.props
    return require(`!raw-loader!@components/${src}`).default
  }

  /* This function is needed to avoid memoization of the source code
   * in SourceRender component (`react-source-code` package). Hot reload
   * does not work properly if the memoization is happening.
   * Issue: https://github.com/layershifter/react-source-render/issues/10
   */
  avoidSourceCodeMemoization = (sourceCode: string) => {
    return `
      ${sourceCode}

      function resetCode() { ${Math.random()} }
    `
  }

  handleShowEditor = () => {
    const { isEditorVisible } = this.state
    this.setState({ isEditorVisible: !isEditorVisible })
  }

  handleCopyLink = () => {
    const { permanentLink } = this.props
    copy(permanentLink)

    this.setState({ copyLinkButtonText: COPY_LINK_COPIED_TEXT })
    setTimeout(() => {
      this.setState({ copyLinkButtonText: COPY_LINK_DEFAULT_TEXT })
    }, 2000)
  }

  handleChangeCode = _.debounce(value => {
    this.setState({ sourceCode: value })
  }, 400)

  render() {
    const { classes } = this.props
    const { sourceCode, isEditorVisible, copyLinkButtonText } = this.state

    /* When we are building storybook for visual tests we want to have
     * only actual component without source code editor
     */
    if (TEST_ENV === 'visual') {
      const renderInTestPicasso = (element: ReactNode) => (
        <Picasso loadFonts={false}>{element}</Picasso>
      )

      return (
        <SourceRender
          babelConfig={{
            presets: ['es2015']
          }}
          render={renderInTestPicasso}
          resolver={resolver}
          source={this.avoidSourceCodeMemoization(sourceCode)}
        >
          <SourceRender.Consumer>
            {({ element }: RenderResult) => element}
          </SourceRender.Consumer>
        </SourceRender>
      )
    }

    if (!sourceCode) {
      return null
    }

    const SourceCodeEditor = (
      <div className={classes.editor}>
        <Editor
          id='some-component-example'
          mode='jsx'
          value={sourceCode}
          onChange={this.handleChangeCode}
        />
      </div>
    )

    const renderInPicasso = (element: ReactNode) => <Picasso>{element}</Picasso>

    return (
      <SourceRender
        babelConfig={{
          presets: ['es2015']
        }}
        render={renderInPicasso}
        resolver={resolver}
        source={this.avoidSourceCodeMemoization(sourceCode)}
      >
        <div className={classes.root}>
          <div className={classes.component}>
            <Container className={classes.componentRenderer} top={2} bottom={2}>
              <SourceRender.Consumer>
                {({ element }: RenderResult) => element}
              </SourceRender.Consumer>

              <SourceRender.Consumer>
                {({ error }: RenderResult) =>
                  error && (
                    <Typography weight='regular' variant='large'>
                      {error.toString()}
                    </Typography>
                  )
                }
              </SourceRender.Consumer>
            </Container>
            <div className={classes.buttons}>
              <Button
                variant='basic'
                size='small'
                icon={<IconCode />}
                onClick={this.handleShowEditor}
              >
                Edit code
              </Button>
              <Button
                variant='basic'
                size='small'
                icon={<IconLink />}
                onClick={this.handleCopyLink}
              >
                {copyLinkButtonText}
              </Button>
            </div>
          </div>
          <div>
            <Accordion content={SourceCodeEditor} expanded={isEditorVisible} />
          </div>
        </div>
      </SourceRender>
    )
  }
}

export default withStyles(styles)(CodeExample)
