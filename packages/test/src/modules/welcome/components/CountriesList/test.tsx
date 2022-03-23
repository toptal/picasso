import React from 'react'
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing'
import {
  render,
  act,
  waitFor,
  fireEvent,
  screen
} from '@toptal/picasso/test-utils'

import CountriesList, { COUNTRIES_ERROR_MESSAGE} from './CountriesList'
import { createGetCountriesMock } from './data'

const mockedShowError = jest.fn()

jest.mock('@toptal/picasso/utils', () => {
  const actualPicassoUtils = jest.requireActual('@toptal/picasso/utils')

  return {
    __esModule: true,
    ...actualPicassoUtils,
    useNotifications: () => ({
      showError: mockedShowError
    })
  }
})

const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

const renderCountriesList = (mocks: MockedProviderProps['mocks']) =>
  render(
    <MockedProvider mocks={mocks}>
      <CountriesList />
    </MockedProvider>
  )

describe('CountriesList', () => {
  afterEach(() => {
    mockedShowError.mockReset()
  })

  describe('when getting list of countries succeeded', () => {
    const countryName = 'Ukraine'
    const getCountriesMockData = {
      countries: {
        nodes: [{
          id: '1',
          googleName: countryName
        }]
      }
    }

    it('shows list of countries', async () => {
      const mocks = [
        createGetCountriesMock(getCountriesMockData)
      ]

      renderCountriesList(mocks)

      expect(await screen.findByText(countryName)).toBeInTheDocument()
    })
  })

  describe('when getting countries list failed', () => {
    beforeEach(async () => {
      const mocks = [
        createGetCountriesMock(undefined, new Error('Something went wrong.'))
      ]

      renderCountriesList(mocks)

      await waitFor(delay as never)
    })

    it('shows an error', () => {
      expect(mockedShowError).toHaveBeenCalledTimes(1)
      expect(mockedShowError).toHaveBeenCalledWith(COUNTRIES_ERROR_MESSAGE)
    })

    it('shows nothing', () => {
      expect(screen.queryByTestId('countriesList')).not.toBeInTheDocument()
    })
  })
})
