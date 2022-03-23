import { gql, useQuery } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query GetCountries @Gateway {
    countries {
      nodes {
        id
        googleName
      }
    }
  }
`

export interface CountriesData {
  countries: {
    nodes: [{
      id: string
      googleName: string
    }]
  }
}

export const useGetCountries = () => useQuery<CountriesData>(GET_COUNTRIES)
