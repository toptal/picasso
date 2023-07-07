import { isCustomEmoji } from '../'

describe('isCustomEmoji', () => {
  describe('when React props are passed', () => {
    describe('when component props are specific to Emoji', () => {
      it('returns true', () => {
        const props = {
          'data-src': 'test',
          'data-emoji-name': 'test',
        }

        expect(isCustomEmoji(props)).toBeTruthy()
      })
    })

    describe('when component props are not specific to Emoji', () => {
      it('returns false', () => {
        const props = {}

        expect(isCustomEmoji(props)).toBeFalsy()
      })
    })
  })

  describe('when HTMLElement is passed', () => {
    describe('when element props are specific to Emoji', () => {
      it('returns true', () => {
        const element = document.createElement('img')

        element.dataset.src = 'test'
        element.dataset.emojiName = 'test'

        expect(isCustomEmoji(element)).toBeTruthy()
      })
    })

    describe('when element props are not specific to Emoji', () => {
      it('returns false', () => {
        const element = document.createElement('img')

        expect(isCustomEmoji(element)).toBeFalsy()
      })
    })
  })
})
