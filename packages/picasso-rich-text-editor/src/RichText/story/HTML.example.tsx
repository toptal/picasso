import React, { useState } from 'react'
import { Grid, Container } from '@toptal/picasso'
import {
  ImagePlugin,
  CodeBlockPlugin,
  RichText,
  RichTextEditor,
  LinkPlugin,
  EmojiPlugin,
  CodePlugin,
} from '@toptal/picasso-rich-text-editor'
import { htmlToHast } from '@toptal/picasso-rich-text-editor/utils'
import type { CustomEmojiGroup } from '@toptal/picasso-rich-text-editor/RichTextEditor'

import type { ASTType } from '../types'

const Example = () => {
  const [html, setHtml] = useState('')

  return (
    <Container style={{ minHeight: '800px' }}>
      <Grid>
        <Grid.Item sm={12} lg={6}>
          <RichTextEditor
            defaultValue={defaultValue}
            onChange={setHtml}
            id='editor'
            plugins={[
              <LinkPlugin />,
              <EmojiPlugin customEmojis={customEmojis} />,
              <ImagePlugin
                onUpload={() =>
                  new Promise(resolve => setTimeout(resolve, 2000))
                }
              />,
              <CodePlugin />,
              <CodeBlockPlugin />,
            ]}
          />
        </Grid.Item>
        <Grid.Item sm={12} lg={6}>
          <RichText value={htmlToHast(html)} />
        </Grid.Item>
      </Grid>
    </Container>
  )
}

const customEmojis = [
  {
    id: 'talent-community',
    name: 'Talent Community',
    emojis: [
      {
        id: 'talent-community',
        name: 'Talent Community',
        keywords: ['Toptal', 'Talent Community', 'Community'],
        skins: [
          {
            src: 'https://emoji.slack-edge.com/T01HSMSV622/talent-community/3937b2735bdea8c3.png',
          },
        ],
      },
    ],
  },
] as CustomEmojiGroup[]

const defaultValue: ASTType = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Position Description' }],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'img',
          properties: {
            src: './jacqueline/128x88.jpg',
            alt: 'Jacqueline',
          },
          children: [],
        },
      ],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        { type: 'text', value: 'We’re looking for ' },
        {
          type: 'element',
          tagName: 'em',
          properties: {},
          children: [
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [{ type: 'text', value: 'hardworking' }],
            },
          ],
        },
        { type: 'text', value: ', self-starting ' },
        {
          type: 'element',
          tagName: 'em',
          properties: {},
          children: [{ type: 'text', value: 'Designers ' }],
        },
        { type: 'text', value: 'for our ' },
        {
          type: 'element',
          tagName: 'img',
          properties: {
            src: customEmojis[0].emojis[0].skins[0].src,
            'data-src': customEmojis[0].emojis[0].skins[0].src,
            'data-emoji-name': customEmojis[0].emojis[0].id,
          },
          children: [],
        },
        {
          type: 'element',
          tagName: 'strong',
          properties: {},
          children: [{ type: 'text', value: ' Product Design' }],
        },
        {
          type: 'text',
          value: ' team to help us define how talent interacts with ',
        },
        {
          type: 'element',
          tagName: 'a',
          properties: { href: 'https://toptal.com' },
          children: [
            { type: 'text', value: 'Toptal, ' },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                { type: 'text', value: 'the greatest talent company ' },
              ],
            },
            {
              type: 'element',
              tagName: 'em',
              properties: {},
              children: [{ type: 'text', value: 'in the world' }],
            },
          ],
        },
        { type: 'text', value: ' 💪' },
      ],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        { type: 'text', value: 'Example of inline ' },
        {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [{ type: 'text', value: 'code()' }],
        },
      ],
    },
    {
      type: 'element',
      tagName: 'pre',
      properties: {},
      children: [
        { type: 'text', value: '<CodeBlock' },
        { type: 'element', tagName: 'br', properties: {}, children: [] },
        { type: 'text', value: '  {...props}' },
        { type: 'element', tagName: 'br', properties: {}, children: [] },
        { type: 'text', value: '/>' },
      ],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value:
            'You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.',
        },
      ],
    },
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Requirements' }],
    },
    {
      type: 'element',
      tagName: 'ol',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'Collaborate with PMs and other designers to ship your first product features.',
            },
            {
              type: 'element',
              tagName: 'ol',
              properties: {},
              children: [
                {
                  type: 'element',
                  tagName: 'li',
                  properties: {},
                  children: [
                    { type: 'text', value: 'Learn about our design system.' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Requirements' }],
    },
    {
      type: 'element',
      tagName: 'ul',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.',
            },
          ],
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.',
            },
            {
              type: 'element',
              tagName: 'ul',
              properties: {},
              children: [
                {
                  type: 'element',
                  tagName: 'li',
                  properties: {},
                  children: [
                    {
                      type: 'text',
                      value:
                        'Lorem itaque assumenda id accusamus omnis! Vel veritatis voluptatibus possimus eum aspernatur Facilis nobis iste iste reprehenderit nihil. Fugiat ipsam',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Example
