declare var TEST_ENV: string // defined by ENV

import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react'
import debounce from 'debounce'
import styled from 'styled-components'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SourceRender, { RenderResult } from 'react-source-render'
import copy from 'copy-to-clipboard'

import { Typography, Button, Accordion, Container } from '@toptal/picasso'
import Picasso, { useScreenSize } from '@toptal/picasso-provider'
import { BaseProps } from '@toptal/picasso-shared'
import { Code16, Link16 } from '@toptal/picasso-icons'

import Editor from '../Editor'
import purifyFixedPosition from '../../utils/purify-fixed-position'
import styles from './styles'

const COPY_LINK_DEFAULT_TEXT = 'Link'
const COPY_LINK_COPIED_TEXT = 'Copied!'
const PRESETS = [['typescript', { allExtensions: true, isTSX: true }], 'es2015']

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCodeExample',
})

interface Props extends BaseProps {
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
  '@toptal/picasso-forms': require('@toptal/picasso-forms'),
  '@toptal/picasso-forms/utils': require('@toptal/picasso-forms/utils'),
  '@toptal/picasso-charts': require('@toptal/picasso-charts'),
  '@toptal/picasso-charts/utils': require('@toptal/picasso-charts/utils'),
  '@topkit/analytics-charts': require('@topkit/analytics-charts'),
  '@topkit/analytics-charts/utils': require('@topkit/analytics-charts'),
  '@toptal/picasso/utils': require('@toptal/picasso-utils'),
  '@toptal/picasso/Icon': require('@toptal/picasso-icons'),
  '@toptal/picasso-provider': require('@toptal/picasso-provider'),
  '@toptal/picasso-pictograms': require('@toptal/picasso-pictograms'),
  '@toptal/picasso-pictograms/Pictogram': require('@toptal/picasso-pictograms/Pictogram'),
  '@toptal/picasso-rich-text-editor': require('@toptal/picasso-rich-text-editor'),
  '@toptal/picasso-rich-text-editor/utils': require('@toptal/picasso-rich-text-editor/utils'),
  '@toptal/picasso-query-builder': require('@toptal/picasso-query-builder'),
  '@toptal/picasso-accordion': require('@toptal/picasso-accordion'),
  '@toptal/picasso-account-select': require('@toptal/picasso-account-select'),
  '@toptal/picasso-alert': require('@toptal/picasso-alert'),
  '@toptal/picasso-amount': require('@toptal/picasso-amount'),
  '@toptal/picasso-backdrop': require('@toptal/picasso-backdrop'),
  '@toptal/picasso-fade': require('@toptal/picasso-fade'),
  '@toptal/picasso-slide': require('@toptal/picasso-slide'),
  '@toptal/picasso-application-update-notification': require('@toptal/picasso-application-update-notification'),
  '@toptal/picasso-autocomplete': require('@toptal/picasso-autocomplete'),
  '@toptal/picasso-avatar': require('@toptal/picasso-avatar'),
  '@toptal/picasso-avatar-upload': require('@toptal/picasso-avatar-upload'),
  '@toptal/picasso-badge': require('@toptal/picasso-badge'),
  '@toptal/picasso-breadcrumbs': require('@toptal/picasso-breadcrumbs'),
  '@toptal/picasso-button': require('@toptal/picasso-button'),
  '@toptal/picasso-calendar': require('@toptal/picasso-calendar'),
  '@toptal/picasso-carousel': require('@toptal/picasso-carousel'),
  '@toptal/picasso-checkbox': require('@toptal/picasso-checkbox'),
  '@toptal/picasso-container': require('@toptal/picasso-container'),
  '@toptal/picasso-date-picker': require('@toptal/picasso-date-picker'),
  '@toptal/picasso-date-select': require('@toptal/picasso-date-select'),
  '@toptal/picasso-drawer': require('@toptal/picasso-drawer'),
  '@toptal/picasso-dropdown': require('@toptal/picasso-dropdown'),
  '@toptal/picasso-dropzone': require('@toptal/picasso-dropzone'),
  '@toptal/picasso-empty-state': require('@toptal/picasso-empty-state'),
  '@toptal/picasso-environment-banner': require('@toptal/picasso-environment-banner'),
  '@toptal/picasso-file-input': require('@toptal/picasso-file-input'),
  '@toptal/picasso-form': require('@toptal/picasso-form'),
  '@toptal/picasso-grid': require('@toptal/picasso-grid'),
  '@toptal/picasso-helpbox': require('@toptal/picasso-helpbox'),
  '@toptal/picasso-icons': require('@toptal/picasso-icons'),
  '@toptal/picasso-image': require('@toptal/picasso-image'),
  '@toptal/picasso-input': require('@toptal/picasso-input'),
  '@toptal/picasso-input-adornment': require('@toptal/picasso-input-adornment'),
  '@toptal/picasso-link': require('@toptal/picasso-link'),
  '@toptal/picasso-list': require('@toptal/picasso-list'),
  '@toptal/picasso-loader': require('@toptal/picasso-loader'),
  '@toptal/picasso-logo': require('@toptal/picasso-logo'),
  '@toptal/picasso-menu': require('@toptal/picasso-menu'),
  '@toptal/picasso-modal': require('@toptal/picasso-modal'),
  '@toptal/picasso-modal-context': require('@toptal/picasso-modal-context'),
  '@toptal/picasso-note': require('@toptal/picasso-note'),
  '@toptal/picasso-notification': require('@toptal/picasso-notification'),
  '@toptal/picasso-number-input': require('@toptal/picasso-number-input'),
  '@toptal/picasso-outlined-input': require('@toptal/picasso-outlined-input'),
  '@toptal/picasso-overview-block': require('@toptal/picasso-overview-block'),
  '@toptal/picasso-page': require('@toptal/picasso-page'),
  '@toptal/picasso-pagination': require('@toptal/picasso-pagination'),
  '@toptal/picasso-paper': require('@toptal/picasso-paper'),
  '@toptal/picasso-password-input': require('@toptal/picasso-password-input'),
  '@toptal/picasso-popper': require('@toptal/picasso-popper'),
  '@toptal/picasso-prompt-modal': require('@toptal/picasso-prompt-modal'),
  '@toptal/picasso-quote': require('@toptal/picasso-quote'),
  '@toptal/picasso-radio': require('@toptal/picasso-radio'),
  '@toptal/picasso-rating': require('@toptal/picasso-rating'),
  '@toptal/picasso-section': require('@toptal/picasso-section'),
  '@toptal/picasso-select': require('@toptal/picasso-select'),
  '@toptal/picasso-show-more': require('@toptal/picasso-show-more'),
  '@toptal/picasso-skeleton-loader': require('@toptal/picasso-skeleton-loader'),
  '@toptal/picasso-slider': require('@toptal/picasso-slider'),
  '@toptal/picasso-step': require('@toptal/picasso-step'),
  '@toptal/picasso-switch': require('@toptal/picasso-switch'),
  '@toptal/picasso-table': require('@toptal/picasso-table'),
  '@toptal/picasso-tabs': require('@toptal/picasso-tabs'),
  '@toptal/picasso-tag': require('@toptal/picasso-tag'),
  '@toptal/picasso-tagselector': require('@toptal/picasso-tagselector'),
  '@toptal/picasso-test-utils': require('@toptal/picasso-test-utils'),
  '@toptal/picasso-timeline': require('@toptal/picasso-timeline'),
  '@toptal/picasso-timepicker': require('@toptal/picasso-timepicker'),
  '@toptal/picasso-tooltip': require('@toptal/picasso-tooltip'),
  '@toptal/picasso-tree-view': require('@toptal/picasso-tree-view'),
  '@toptal/picasso-typography': require('@toptal/picasso-typography'),
  '@toptal/picasso-typography-overflow': require('@toptal/picasso-typography-overflow'),
  '@toptal/picasso-user-badge': require('@toptal/picasso-user-badge'),
  '@toptal/picasso-utils': require('@toptal/picasso-utils'),
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
    <Picasso
      fixViewport={false}
      loadFavicon={false}
      preventPageWidthChangeOnScrollbar={false}
    >
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
  module,
}: Pick<Props, 'src' | 'module'>) => {
  try {
    return requireContext(`./${module}/src/${src}`).default
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

  try {
    return requireContext(`./picasso-provider/src/${src}`).default
  } catch {}

  try {
    return requireContext(`./picasso-pictograms/src/${src}`).default
  } catch {}

  try {
    return requireContext(`./picasso-rich-text-editor/src/${src}`).default
  } catch {}

  try {
    return requireContext(`./picasso-query-builder/src/${src}`).default
  } catch {}

  return require(`!raw-loader!~/.storybook/stories/${src}`).default
}

const CodeExample = (props: Props) => {
  const { permanentLink, showEditCode } = props

  const classes = useStyles()
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

  const handleChangeCode = useCallback(debounce(setSourceCode, 400), [])

  /* When we are building storybook for visual tests we want to have
   * only actual component without source code editor
   */
  if (TEST_ENV === 'visual') {
    const renderInTestPicasso = (element: ReactNode) => (
      <Picasso
        loadFonts={false}
        fixViewport={false}
        loadFavicon={false}
        preventPageWidthChangeOnScrollbar={false}
      >
        <Purifier>{element}</Purifier>
      </Picasso>
    )

    return (
      <div className={classes.componentRenderer}>
        <SourceRender
          babelConfig={{
            presets: PRESETS,
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
        presets: PRESETS,
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
                  variant='secondary'
                  size='small'
                  icon={<Code16 />}
                  onClick={toggleEditorVisibility}
                >
                  Edit code
                </Button>
              )}
              <Button
                variant='secondary'
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
  module: 'picasso',
}

export default CodeExample
