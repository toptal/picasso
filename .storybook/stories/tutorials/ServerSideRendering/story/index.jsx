import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Tutorials').createPage(
  'Server Side Rendering and Picasso',
  '⚠️ Experimental support, some components and features might not work as expected'
)

const generalUsage = page.createChapter('General usage')

generalUsage.addTextSection(`
As using Picasso with SSR is still an experiment some components and features might not work out of the box. We are working on catching and fixing these errors so bear with us.
`)

generalUsage.addTextSection(
  `
Currently, some features from PicassoProvider cannot be used on the server-side. That is why you have to switch them off.

It is required to enable \`disableClassNamePrefix\` to avoid getting a \`className\` mismatch between server and client.

~~~tsx
import Picasso from '@toptal/picasso-provider'

export const Component = children => (
  <Picasso
    loadFavicon={false}
    fixViewport={false}
    loadFonts={false}
    disableClassNamePrefix
  >
    {children}
  </Picasso>
)
~~~
`,
  {
    title: 'Check how you use PicassoProvider'
  }
)

generalUsage.addTextSection(
  `
Some components are using browser-specific methods and because of that, they will fail on the server. When importing from \`@toptal/picasso\` depending on processing (compiling) that you have set up
it might start analyzing components that you are not planning to use.

~~~tsx
import Picasso from '@toptal/picasso-provider'

import { Button } from '@toptal/picasso' // this might throw an error
import Button from '@toptal/picasso/Button'

export const Component = () => (
  <Picasso
    loadFavicon={false}
    fixViewport={false}
    loadFonts={false}
    disableClassNamePrefix
  >
    <Button>Hello from Picasso</Button>
  </Picasso>
)
~~~
`,
  {
    title: 'Check how you import components'
  }
)
generalUsage.addTextSection(
  `
To make styling work a \`getServersideStylesheets\` function was introduced. It creates an ServerStyleSheets object instance with two methods:

- \`collect(children: React.ReactNode, options?: object)\` - you can pass your React app as params and it will collect and internally store available styles
- \`getStyleElement(props?: object)\` - this will return a React.ReactElement a style tag with collected CSS
- \`toString()\` - this will return collected CSS

~~~tsx
import Picasso, { getServersideStylesheets } from '@toptal/picasso-provider'
import ReactDOMServer from 'react-dom/server'
import App from './App'

function handleRender(req, res) {
  const sheets = getServersideStylesheets();

  // Render the component to a string.
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
  );

  // Grab the CSS from the sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}
~~~
`,
  {
    title: 'Collect styles on server'
  }
)

page.createChapter('next.js tutorial').addTextSection(
  `
In this tutorial you will learn how to enable Picasso usage in a project that uses \`next.js\` with Server Side Rendering and Static Site Generation.
Picasso usage on server side is currently in experimental phase, some features\/components might not work as expected, or might not work at all.

**Note** This example uses next.js@12 and @toptal/picasso@14
`
)

const tutorial = page.createChapter()

tutorial.addTextSection(
  `
    yarn create next-app --typescript
    `,
  {
    title: '1: Create an empty next.js project'
  }
)

tutorial.addTextSection(
  `
    yarn add @toptal/picasso
    `,
  {
    title: '2: Add Picasso as a dependency'
  }
)

tutorial.addTextSection(
  `
‼️ Currently it is required to set the following props to \`false\`: \`loadFavicon\`, \`fixViewport\`, \`loadFonts\`

~~~tsx
// pages/_app.tsx

import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Picasso from '@toptal/picasso-provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Picasso loadFavicon={false} fixViewport={false} loadFonts={false} disableClassNamePrefix={true}>
      <Component {...pageProps} />
    </Picasso>
  );
}

export default MyApp;
~~~
    `,
  {
    title: '3: Wrap "_app.tsx" in PicassoProvider'
  }
)

tutorial.addTextSection(
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
    title: '4: Add server side stylesheet generation to "_document.tsx"'
  }
)

tutorial.addTextSection(
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
    title: '5: Transpile Picasso modules using "next-transpile-modules"'
  }
)

tutorial.addTextSection(
  `
~~~typescript
// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Container from '@toptal/picasso/Container';
import Typography from '@toptal/picasso/Typography';
import Alert from '@toptal/picasso/Alert';

import Button from '@toptal/picasso/Button';
import { useNotifications } from '@toptal/picasso/utils';

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
  );
};

export default Home;
~~~
    `,
  {
    title: '6: Create a demo page using some of the Picasso components'
  }
)
