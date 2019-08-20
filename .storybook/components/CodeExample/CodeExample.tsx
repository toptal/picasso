declare var TEST_ENV: string // defined by ENV

import React, {
  ReactNode,
  Component,
  FunctionComponent,
  useState,
  useEffect
} from 'react'
import debounce from 'debounce'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import IconLink from '@material-ui/icons/Link'
import SourceRender from 'react-source-render'
import copy from 'copy-to-clipboard'

import { Code16 } from '@components/Icon'

import { RenderResult } from '~/@types/react-source-render'
import { Classes } from '@components/styles/types'
import Picasso, { Typography, Button, Accordion, Container } from '@components'

import Editor from '../Editor'
import purifyFixedPosition from '../../utils/purify-fixed-position'
import styles from './styles'

const COPY_LINK_DEFAULT_TEXT = 'Link'
const COPY_LINK_COPIED_TEXT = 'Copied!'
const PRESETS = [['typescript', { allExtensions: true, isTSX: true }], 'es2015']

interface Props {
  classes: Classes
  permanentLink: string
  src: string
  showEditCode?: boolean
}

const imports: Record<string, object> = {
  react: React,
  'styled-components': styled,
  '@toptal/picasso': require('@components'),
  '@toptal/picasso/lab': require('@components/lab'),
  '@toptal/picasso/utils': require('@components/utils'),
  '@toptal/picasso/Icon': require('@components/Icon')
}

const resolver = (path: string) => imports[path]

// react-source-render uses internally server side rendering
// so React is complaining about useLayoutEffect hook usage
// for SSR rendering.
// This fix is suggested here
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#option-2-lazily-show-component-with-uselayouteffect
const PicassoSSR: FunctionComponent = ({ children }) => {
  const [showPicasso, setShowPicasso] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowPicasso(true)
  }, [])

  if (!showPicasso) {
    return null
  }

  return <Picasso>{children}</Picasso>
}

class CodeExample extends Component<Props> {
  static defaultProps = {
    showEditCode: true
  }

  state = {
    sourceCode: '',
    isEditorVisible: false,
    copyLinkButtonText: COPY_LINK_DEFAULT_TEXT
  }

  sourceRendererRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const sourceCode = this.getOriginalSourceCode()
    this.setState({ sourceCode })
  }

  componentDidUpdate() {
    this.purifyFixedPositionElements()
  }

  /* We need this function because of the fixed positioned components
   * like PageHeader. We want to make them behave like absolute positioned
   * elements inside the each example, especially when scroll involved.
   */
  purifyFixedPositionElements = () => {
    if (!this.sourceRendererRef.current) {
      return
    }

    purifyFixedPosition(this.sourceRendererRef.current)
  }

  getOriginalSourceCode = () => {
    const { src } = this.props

    try {
      return require(`!raw-loader!@components/${src}`).default
    } catch (e) {
      return require(`!raw-loader!~/.storybook/stories/${src}`).default
    }
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

  handleChangeCode = debounce((value: string) => {
    this.setState({ sourceCode: value })
  }, 400)

  render() {
    const { classes, showEditCode } = this.props
    const { sourceCode, isEditorVisible, copyLinkButtonText } = this.state

    /* When we are building storybook for visual tests we want to have
     * only actual component without source code editor
     */
    if (TEST_ENV === 'visual') {
      const renderInTestPicasso = (element: ReactNode) => (
        <Picasso loadFonts={false}>{element}</Picasso>
      )

      return (
        <div ref={this.sourceRendererRef} className={classes.componentRenderer}>
          <SourceRender
            babelConfig={{
              presets: PRESETS
            }}
            wrap={renderInTestPicasso}
            resolver={resolver}
            source={sourceCode}
            unstable_hot
          >
            {({ element }: RenderResult) => element}
          </SourceRender>
        </div>
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

    const renderInPicasso = (element: ReactNode) => (
      <PicassoSSR>{element}</PicassoSSR>
    )

    return (
      <div ref={this.sourceRendererRef}>
        <SourceRender
          babelConfig={{
            presets: PRESETS
          }}
          wrap={renderInPicasso}
          resolver={resolver}
          source={sourceCode}
          unstable_hot
        >
          {({ element, error }: RenderResult) => (
            <div className={classes.root}>
              <div className={classes.component}>
                <Container
                  className={classes.componentRenderer}
                  top='large'
                  bottom='large'
                >
                  {element}
                  {error && (
                    <Typography color='red'>{error.toString()}</Typography>
                  )}
                </Container>
                <div className={classes.buttons}>
                  {showEditCode && (
                    <Button
                      variant='flat'
                      size='small'
                      icon={<Code16 />}
                      onClick={this.handleShowEditor}
                    >
                      Edit code
                    </Button>
                  )}
                  <Button
                    variant='flat'
                    size='small'
                    icon={<IconLink />}
                    onClick={this.handleCopyLink}
                  >
                    {copyLinkButtonText}
                  </Button>
                </div>
              </div>
              <div>
                <Accordion
                  content={SourceCodeEditor}
                  expanded={isEditorVisible}
                />
              </div>
            </div>
          )}
        </SourceRender>
      </div>
    )
  }
}

export default withStyles(styles)(CodeExample)
