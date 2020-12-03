declare var TEST_ENV: string // defined by ENV

import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
  useLayoutEffect
} from 'react'
import debounce from 'debounce'
import styled from 'styled-components'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SourceRender, { RenderResult } from 'react-source-render'
import copy from 'copy-to-clipboard'

import { Typography, Button, Accordion, Container } from '@toptal/picasso'
import Picasso, {
  mergeClasses,
  StandardProps,
  useScreenSize
} from '@toptal/picasso-shared'
import { Code16, Link16 } from '@toptal/picasso/Icon'

import Editor from '../Editor'
import purifyFixedPosition from '../../utils/purify-fixed-position'
import styles from './styles'

const COPY_LINK_DEFAULT_TEXT = 'Link'
const COPY_LINK_COPIED_TEXT = 'Copied!'
const PRESETS = [['typescript', { allExtensions: true, isTSX: true }], 'es2015']

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoCodeExample'
})

interface Props extends StandardProps {
  permanentLink: string
  src: string
  showEditCode?: boolean
  module?: string
}

const imports: Record<string, object> = {
  react: React,
  'styled-components': styled,
  'react-router-dom': require('react-router-dom'),
  'react-final-form': require('react-final-form'),
  debounce: require('debounce'),
  'date-fns': require('date-fns'),
  '@toptal/picasso': require('@toptal/picasso'),
  '@toptal/picasso-lab': require('@toptal/picasso-lab'),
  '@toptal/picasso-forms': require('@toptal/picasso-forms'),
  '@toptal/picasso-forms/utils': require('@toptal/picasso-forms/utils'),
  '@toptal/picasso-charts': require('@toptal/picasso-charts'),
  '@toptal/picasso-charts/utils': require('@toptal/picasso-charts/utils'),
  '@topkit/analytics-charts': require('@topkit/analytics-charts'),
  '@topkit/analytics-charts/utils': require('@topkit/analytics-charts'),
  '@toptal/picasso/utils': require('@toptal/picasso/utils'),
  '@toptal/picasso/Icon': require('@toptal/picasso/Icon')
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
    <Picasso fixViewport={false} loadFavicon={false}>
      <Purifier>{children}</Purifier>
    </Picasso>
  )
}

const requireContext = require.context(
  '!raw-loader!~/packages/',
  true,
  /^.*story.*\.(js|jsx|ts|tsx)$/
)

const getOriginalSourceCode = ({
  src,
  module
}: Pick<Props, 'src' | 'module'>) => {
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

const CodeExample = (props: Props) => {
  const { permanentLink, showEditCode, classes: externalClasses } = props

  const classes = mergeClasses(useStyles(props), externalClasses)
  const [sourceCode, setSourceCode] = useState(getOriginalSourceCode(props))
  const [isEditorVisible, setEditorVisible] = useState(false)
  const [copyLinkButtonText, setCopyLinkButtonText] = useState(
    COPY_LINK_DEFAULT_TEXT
  )

  const toggleEditorVisibility = () => {
    setEditorVisible(!isEditorVisible)
  }

  const handleCopyLink = () => {
    copy(permanentLink)

    setCopyLinkButtonText(COPY_LINK_COPIED_TEXT)
    setTimeout(() => {
      setCopyLinkButtonText(COPY_LINK_DEFAULT_TEXT)
    }, 2000)
  }

  const handleChangeCode = debounce(setSourceCode, 400)

  /* When we are building storybook for visual tests we want to have
   * only actual component without source code editor
   */
  if (TEST_ENV === 'visual') {
    const renderInTestPicasso = (element: ReactNode) => (
      <Picasso loadFonts={false} fixViewport={false} loadFavicon={false}>
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
        onChange={handleChangeCode}
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
              {error && <Typography color='red'>{error.toString()}</Typography>}
            </Container>
            <div className={classes.buttons}>
              {showEditCode && (
                <Button
                  variant='flat'
                  size='small'
                  icon={<Code16 />}
                  onClick={toggleEditorVisibility}
                >
                  Edit code
                </Button>
              )}
              <Button
                variant='flat'
                size='small'
                icon={<Link16 />}
                onClick={handleCopyLink}
              >
                {copyLinkButtonText}
              </Button>
            </div>
          </div>
          <div>
            <Accordion content={SourceCodeEditor} expanded={isEditorVisible} />
          </div>
        </div>
      )}
    </SourceRender>
  )
}

CodeExample.displayName = 'CodeExample'

CodeExample.defaultProps = {
  showEditCode: true,
  module: 'picasso'
}

export default CodeExample
