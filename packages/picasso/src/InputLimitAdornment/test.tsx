import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import InputLimitAdornment, { Props } from './InputLimitAdornment'

const renderAdornment = (props: Props) =>
  render(<InputLimitAdornment {...props} />)

describe('InputLimitAdornment', () => {
  describe('multiline', () => {
    it('uses singular when one characters is entered', async () => {
      const { findByText } = renderAdornment({
        counter: 'entered',
        limit: 0,
        multiline: true,
        charsLength: 1,
      })

      const limitText = await findByText('1 character entered')

      expect(limitText).toBeInTheDocument()
    })

    it('uses plural when two characters are entered', async () => {
      const { findByText } = renderAdornment({
        counter: 'entered',
        limit: 0,
        multiline: true,
        charsLength: 2,
      })

      const limitText = await findByText('2 characters entered')

      expect(limitText).toBeInTheDocument()
    })

    it('uses plural when there are not characters left', async () => {
      const { findByText } = renderAdornment({
        counter: 'remaining',
        limit: 3,
        multiline: true,
        charsLength: 3,
      })

      const limitText = await findByText('0 characters left')

      expect(limitText).toBeInTheDocument()
    })

    it('uses singular when there is one character left', async () => {
      const { findByText } = renderAdornment({
        counter: 'remaining',
        limit: 3,
        multiline: true,
        charsLength: 2,
      })

      const limitText = await findByText('1 character left')

      expect(limitText).toBeInTheDocument()
    })

    it('uses plural when there are two characters left', async () => {
      const { findByText } = renderAdornment({
        counter: 'remaining',
        limit: 3,
        multiline: true,
        charsLength: 1,
      })

      const limitText = await findByText('2 characters left')

      expect(limitText).toBeInTheDocument()
    })
  })
})
