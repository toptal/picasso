import PicassoBook from '~/.storybook/components/PicassoBook'

const ssrPage = PicassoBook.section('Tutorials').createPage(
  'How to use server side rendering',
  '⚠️ Experimental support, some components and features might not work as expected.'
)

const generalUsage = ssrPage.createChapter()

generalUsage.addTextSection(
  `The basic components of Picasso are ready to be used on the
  server side. However, comparing to usage of Picasso on client
  side, on server side we need to follow some rules (in the future
  most likely they will be reworked):`
)

generalUsage.addTextSection(
  `
We need to disable client side features for Picasso root:

1. Remove favicon, font, viewport meta tag
2. Disable Picasso class name prefix (to avoid generating different className prefix on server and client)

Example:

~~~tsx
import Picasso from '@toptal/picasso-provider'
...
<Picasso
  loadFavicon={false}
  fixViewport={false}
  loadFonts={false}
  disableClassNamePrefix
>
  ...
</Picasso>
~~~
`,
  {
    title: 'Remove PicassoProvider client side features'
  }
)

generalUsage
  .addTextSection(
    `
JSS implementation of Picasso styles requires to pre-render styles and classes on server side.
To make it possible a utility function \`getServersideStylesheets\` was introduced.
`,
    {
      title: 'Render styles on server side'
    }
  )
  .addExample(
    'tutorials/ServerSideRendering/story/ServerSideUtils.example.tsx',
    {
      id: 'server-side-utils',
      showEditCode: false
    }
  ) // picasso-skip-visuals
generalUsage.addTextSection(
  `Example:

  ~~~tsx
  import Picasso, { getServersideStylesheets } from '@toptal/picasso-provider'
  import ReactDOMServer from 'react-dom/server'
  import App from './App'
  
  function handleRender(req, res) {
    const sheets = getServersideStylesheets()
  
    // Render the component to a string
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <Picasso
          loadFavicon={false}
          fixViewport={false}
          loadFonts={false}
          disableClassNamePrefix>
          <App />
        </Picasso>,
      ),
    )
  
    // Grab the CSS from the sheets.
    const css = sheets.toString()
  
    // Send the rendered page back to the client.
    res.send(renderFullPage(html, css))
  }
  ~~~`
)

generalUsage.addTextSection(
  `
Import components directly to avoid including components from Picasso
which might use browser-specific methods and not work yet on the server side.

When importing from \`@toptal/picasso\`, processor might include
such components to the bundle (ex. Next.js).

~~~tsx
import { Button } from '@toptal/picasso' // DOESN'T WORK
import Button from '@toptal/picasso/Button' // <--- WORKS
~~~
`,
  {
    title: 'Use direct imports for Picasso components (temporary solution)'
  }
)

/** Next.js tutorial */
const nextJSChapter = ssrPage.createChapter(
  'Next.js',
  `
  Step by step guide how to start using Picasso in a project with Next.js (with Server Side Rendering and Static Site Generation).

  _In all examples was used Next.js@12._
  `
)

nextJSChapter.addTextSection(
  `
    yarn create next-app --typescript
    `,
  {
    title: '1: Create an empty Next.js project'
  }
)

nextJSChapter.addTextSection(
  `
    yarn add @toptal/picasso @toptal/picasso-provider
    `,
  {
    title: '2: Add Picasso and PicassoProvider as a dependency'
  }
)

nextJSChapter.addTextSection(
  `
~~~tsx
// pages/_app.tsx

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Picasso from '@toptal/picasso-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Picasso
      loadFavicon={false}
      fixViewport={false}
      loadFonts={false}
      disableClassNamePrefix
    >
      <Component {...pageProps} />
    </Picasso>
  )
}

export default MyApp
~~~
    `,
  {
    title: '3: Wrap _app.tsx in PicassoProvider'
  }
)

nextJSChapter.addTextSection(
  `
~~~tsx
// pages/_document.tsx

import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { getServersideStylesheets } from '@toptal/picasso-provider'


export default class MyDocument extends Document {
  static getInitialProps = async (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> => {
    const sheets = getServersideStylesheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
        enhanceComponent: Component => props =>
          sheets.collect(<Component {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
~~~
    `,
  {
    title: '4: Add server side stylesheet generation to _document.tsx'
  }
)

nextJSChapter.addTextSection(
  `
First add it as a devDependency

~~~sh
yarn add next-transpile-modules -D
~~~

Then update \`next.config.js\`

~~~typescript
// next.config.js

/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@toptal/picasso'])

module.exports = withTM({
  reactStrictMode: true,
  experimental: { esmExternals: true }
})
~~~
    `,
  {
    title: '5: Transpile Picasso modules'
  }
)

nextJSChapter.addTextSection(
  `
~~~typescript
// pages/index.tsx

import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '@toptal/picasso/Container'
import Typography from '@toptal/picasso/Typography'
import Alert from '@toptal/picasso/Alert'

import Button from '@toptal/picasso/Button'
import { useNotifications } from '@toptal/picasso/utils'

const Home: NextPage = () => {
  const { showInfo } = useNotifications()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Container bottom={5}>
          <Container bottom={1}>
            <Typography variant='heading' size='small'>
              This is an Alert component imported from @toptal/picasso
            </Typography>
          </Container>
          <Alert variant='red'>Hello from Picasso</Alert>
        </Container>
        <Container bottom={5}>
          <Container bottom={1}>
            <Typography variant='heading' size='small'>
              These are Button and Notification components imported from @toptal/picasso
            </Typography>
          </Container>
          <Button data-testid='trigger' variant='secondary' onClick={() => showInfo("That's one small step for a man, one giant leap for mankind.")}>
            Show general notification
          </Button>
        </Container>
      </main>
    </div>
  )
}

export default Home
~~~
    `,
  {
    title: '6: Use Picasso components'
  }
)
