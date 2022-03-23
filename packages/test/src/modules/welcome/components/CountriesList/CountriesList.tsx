import React, { useEffect } from 'react'
import { Typography, Container, SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

import { useGetCountries } from './data'

export const COUNTRIES_ERROR_MESSAGE = "Couldn't get list of countries"
const NUMBER_OF_COUNTRIES = 5

const AddressDetails = () => {
  const { showError } = useNotifications()

  const { loading: countriesLoading, data: countriesData, error } = useGetCountries()

  useEffect(() => {
    if (error) {
      showError(COUNTRIES_ERROR_MESSAGE)
    }
  }, [!!error])

  if (error) {
    return null
  }

  if (countriesLoading) {
    return (
      <Container data-testid='countriesLoader'>
        <SkeletonLoader.Typography rows={1} />
      </Container>
    )
  }

  return (
    <>
      <Typography>
        Top {NUMBER_OF_COUNTRIES} countries from GQL Gateway API:
      </Typography>
      <Container data-testid='countriesList'>
        {countriesData?.countries.nodes.slice(0, NUMBER_OF_COUNTRIES).map(country => (
          <Typography key={country.id}>{country.googleName}</Typography>
        ))}
      </Container>
    </>
  )
}

AddressDetails.displayName = 'AddressDetails'

export default AddressDetails
