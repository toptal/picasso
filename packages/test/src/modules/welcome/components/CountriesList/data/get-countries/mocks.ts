import { GET_COUNTRIES } from './get-countries.gql'

interface GetCountriesMockData {
  countries: {
    nodes: {
      id: string
      googleName: string
    }[]
  }
}

export const createGetCountriesMock = (
  mockData?: GetCountriesMockData,
  error?: Error
) => ({
  request: {
    query: GET_COUNTRIES
  },
  result: mockData
    ? {
        data: {
          countries: {
            __typename: 'CountryConnection',
            nodes: mockData.countries.nodes.map(node => ({
              ...node,
              __typename: 'Country'
            }))
          }
        }
      }
    : undefined,
  error
})
