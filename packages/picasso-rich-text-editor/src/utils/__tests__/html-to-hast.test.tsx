import { htmlToHast } from '..'

describe('html-to-hast', () => {
  describe('valid HTML string', () => {
    it('returns valid Picasso components', () => {
      const html = '<h3>heading</h3><p>normal</p>'
      const result = htmlToHast(html)

      expect(result).toEqual({
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'h3',
            properties: {},
            children: [{ type: 'text', value: 'heading' }],
          },
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [{ type: 'text', value: 'normal' }],
          },
        ],
      })
    })

    it('keeps the target and rel of links', () => {
      const html =
        '<p><a href="https://toptal.com" target="_blank" rel="noopener noreferrer" onclick="evil()">Toptal</a></p>'

      expect(htmlToHast(html).children[0]).toEqual({
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://toptal.com',
              target: '_blank',
              rel: ['noopener', 'noreferrer'],
            },
            children: [{ type: 'text', value: 'Toptal' }],
          },
        ],
      })
    })

    it('strips script tags', () => {
      const html = `
        <script>alert(2)</script>
        <p><em>Foo</em></p>`
      const ast = htmlToHast(html)

      expect(ast).toEqual({
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'em',
                properties: {},
                children: [{ type: 'text', value: 'Foo' }],
              },
            ],
          },
        ],
      })
    })
  })

  describe('when parsing HTML with a single container', () => {
    it('returns an single starting node AST for a single paragraph', () => {
      const html = '<p>Container</p>'

      expect(htmlToHast(html)).toEqual({
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [{ type: 'text', value: 'Container' }],
          },
        ],
      })
    })

    it('returns an single starting node AST for lists', () => {
      const html = '<ul><li>Item 1</li><li>Item 2</li></ul>'

      expect(htmlToHast(html)).toEqual({
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'ul',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [{ type: 'text', value: 'Item 1' }],
              },
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [{ type: 'text', value: 'Item 2' }],
              },
            ],
          },
        ],
      })
    })
  })
})
