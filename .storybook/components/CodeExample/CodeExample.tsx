declare var TEST_ENV: string // defined by ENV

import React, {
  ReactNode,
  Component,
  FunctionComponent,
  useState,
  useEffect,
  useLayoutEffect
} from 'react'
import debounce from 'debounce'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import IconLink from '@material-ui/icons/Link'
import SourceRender from 'react-source-render'
import copy from 'copy-to-clipboard'

import { Code16 } from '../../../packages/picasso/src/Icon'

import { RenderResult } from '../../../@types/react-source-render'
import { Classes } from '../../../packages/shared/src/styles/types'
import Picasso from '../../../packages/shared'
import {
  Typography,
  Button,
  Accordion,
  Container
} from '../../../packages/picasso'
import { useScreenSize } from '../../../packages/shared/src/Picasso'

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
  'react-router-dom': require('react-router-dom'),
  'react-final-form': require('react-final-form'),
  debounce: require('debounce'),
  'date-fns': require('date-fns'),
  // TODO: need to fix those direct imports
  // and use @toptal/picasso-lab or @toptal/picasso packages here
  '@toptal/picasso': require('../../../packages/picasso'),
  '@toptal/picasso-lab': require('../../../packages/picasso-lab'),
  '@toptal/picasso-forms': require('../../../packages/picasso-forms'),
  '@toptal/picasso-forms/utils': require('../../../packages/picasso-forms/src/utils'),
  '@toptal/picasso-charts': require('../../../packages/picasso-charts'),
  '@toptal/picasso-charts/utils': require('../../../packages/picasso-charts/src/utils'),
  '@topkit/analytics-charts': require('../../../packages/topkit-analytics-charts'),
  '@topkit/analytics-charts/utils': require('../../../packages/topkit-analytics-charts/src/utils'),
  '@toptal/picasso/utils': require('../../../packages/picasso/src/utils'),
  '@toptal/picasso/Icon': require('../../../packages/picasso/src/Icon')
}

const resolver = (path: string) => imports[path]

const Purifier: FunctionComponent = ({ children }) => {
  const sourceRendererRef = React.createRef<HTMLDivElement>()

  const screenSize = useScreenSize()

  useLayoutEffect(() => {
    if (!sourceRendererRef.current) {
      return
    }

    purifyFixedPosition(sourceRendererRef.current)
  }, [sourceRendererRef, screenSize])

  return <div ref={sourceRendererRef}>{children}</div>
}

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

  return (
    <Picasso fixViewport={false}>
      <Purifier>{children}</Purifier>
    </Picasso>
  )
}

const requireContext = require.context(
  '!raw-loader!~/packages/',
  true,
  /^.*story.*\.(js|jsx|ts|tsx)$/
)

class CodeExample extends Component<Props> {
  static displayName = 'CodeExample'

  static defaultProps = {
    showEditCode: true,
    module: 'picasso'
  }

  state = {
    sourceCode: '',
    isEditorVisible: false,
    copyLinkButtonText: COPY_LINK_DEFAULT_TEXT
  }

  componentDidMount() {
    const sourceCode = this.getOriginalSourceCode()
    this.setState({ sourceCode })
  }

  getOriginalSourceCode = () => {
    const { src, module } = this.props

    try {
      return requireContext(`./${module}/src/${src}`).default
    } catch {}

    try {
      return requireContext(`./picasso-lab/src/${src}`).default
    } catch {}

    try {
      return requireContext(`./picasso-forms/src/${src}`).default
    } catch {}

    try {
      return requireContext(`./picasso-charts/src/${src}`).default
    } catch {}

    try {
      return requireContext(`./topkit-analytics-charts/src/${src}`).default
    } catch {}

    try {
      return requireContext(`./shared/src/${src}`).default
    } catch {}

    return require(`!raw-loader!~/.storybook/stories/${src}`).default
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
        <Picasso loadFonts={false} fixViewport={false}>
          <Purifier>{element}</Purifier>
        </Picasso>
      )

      return (
        <div className={classes.componentRenderer}>
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
    )
  }
}

export default withStyles(styles)(CodeExample)
