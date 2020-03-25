/* eslint-disable max-lines */
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  {
    value: 'VjEtQ291bnRyeS05MDI0OQ',
    text: 'Afghanistan'
  },
  {
    value: 'VjEtQ291bnRyeS0y',
    text: 'Albania'
  },
  {
    value: 'VjEtQ291bnRyeS0z',
    text: 'Algeria'
  },
  {
    value: 'VjEtQ291bnRyeS00',
    text: 'American Samoa'
  },
  {
    value: 'VjEtQ291bnRyeS01',
    text: 'Andorra'
  },
  {
    value: 'VjEtQ291bnRyeS02',
    text: 'Angola'
  },
  {
    value: 'VjEtQ291bnRyeS03',
    text: 'Anguilla'
  },
  {
    value: 'VjEtQ291bnRyeS04',
    text: 'Antarctica'
  },
  {
    value: 'VjEtQ291bnRyeS05',
    text: 'Antigua and Barbuda'
  },
  {
    value: 'VjEtQ291bnRyeS0xMA',
    text: 'Argentina'
  },
  {
    value: 'VjEtQ291bnRyeS0xMQ',
    text: 'Armenia'
  },
  {
    value: 'VjEtQ291bnRyeS0xMg',
    text: 'Aruba'
  },
  {
    value: 'VjEtQ291bnRyeS0xMw',
    text: 'Australia'
  },
  {
    value: 'VjEtQ291bnRyeS0xNA',
    text: 'Austria'
  },
  {
    value: 'VjEtQ291bnRyeS0xNQ',
    text: 'Azerbaijan'
  },
  {
    value: 'VjEtQ291bnRyeS0xNg',
    text: 'Bahamas'
  },
  {
    value: 'VjEtQ291bnRyeS0xNw',
    text: 'Bahrain'
  },
  {
    value: 'VjEtQ291bnRyeS0xOA',
    text: 'Bangladesh'
  },
  {
    value: 'VjEtQ291bnRyeS0xOQ',
    text: 'Barbados'
  },
  {
    value: 'VjEtQ291bnRyeS0yMA',
    text: 'Belarus'
  },
  {
    value: 'VjEtQ291bnRyeS0yMQ',
    text: 'Belgium'
  },
  {
    value: 'VjEtQ291bnRyeS0yMg',
    text: 'Belize'
  },
  {
    value: 'VjEtQ291bnRyeS0yMw',
    text: 'Benin'
  },
  {
    value: 'VjEtQ291bnRyeS0yNA',
    text: 'Bermuda'
  },
  {
    value: 'VjEtQ291bnRyeS0yNQ',
    text: 'Bhutan'
  },
  {
    value: 'VjEtQ291bnRyeS0yNg',
    text: 'Bolivia'
  },
  {
    value: 'VjEtQ291bnRyeS0yNw',
    text: 'Bonaire, Sint Eustatius and Saba'
  },
  {
    value: 'VjEtQ291bnRyeS0yOA',
    text: 'Bosnia and Herzegovina'
  },
  {
    value: 'VjEtQ291bnRyeS0yOQ',
    text: 'Botswana'
  },
  {
    value: 'VjEtQ291bnRyeS0zMA',
    text: 'Bouvet Island'
  },
  {
    value: 'VjEtQ291bnRyeS0zMQ',
    text: 'Brazil'
  },
  {
    value: 'VjEtQ291bnRyeS0zMg',
    text: 'British Indian Ocean Territory'
  },
  {
    value: 'VjEtQ291bnRyeS0zMw',
    text: 'Brunei'
  },
  {
    value: 'VjEtQ291bnRyeS0zNA',
    text: 'Bulgaria'
  },
  {
    value: 'VjEtQ291bnRyeS0zNQ',
    text: 'Burkina Faso'
  },
  {
    value: 'VjEtQ291bnRyeS0zNg',
    text: 'Burundi'
  },
  {
    value: 'VjEtQ291bnRyeS0zNw',
    text: 'Cambodia'
  },
  {
    value: 'VjEtQ291bnRyeS0zOA',
    text: 'Cameroon'
  },
  {
    value: 'VjEtQ291bnRyeS0zOQ',
    text: 'Canada'
  },
  {
    value: 'VjEtQ291bnRyeS00MA',
    text: 'Cape Verde'
  },
  {
    value: 'VjEtQ291bnRyeS00MQ',
    text: 'Cayman Islands'
  },
  {
    value: 'VjEtQ291bnRyeS00Mg',
    text: 'Central African Republic'
  },
  {
    value: 'VjEtQ291bnRyeS00Mw',
    text: 'Chad'
  },
  {
    value: 'VjEtQ291bnRyeS00NA',
    text: 'Chile'
  },
  {
    value: 'VjEtQ291bnRyeS00NQ',
    text: 'China'
  },
  {
    value: 'VjEtQ291bnRyeS00Ng',
    text: 'Christmas Island'
  },
  {
    value: 'VjEtQ291bnRyeS00Nw',
    text: 'Cocos (Keeling) Islands'
  },
  {
    value: 'VjEtQ291bnRyeS00OA',
    text: 'Colombia'
  },
  {
    value: 'VjEtQ291bnRyeS00OQ',
    text: 'Comoros'
  },
  {
    value: 'VjEtQ291bnRyeS01Mg',
    text: 'Cook Islands'
  },
  {
    value: 'VjEtQ291bnRyeS01Mw',
    text: 'Costa Rica'
  },
  {
    value: 'VjEtQ291bnRyeS01NQ',
    text: 'Croatia'
  },
  {
    value: 'VjEtQ291bnRyeS01Ng',
    text: 'Cuba'
  },
  {
    value: 'VjEtQ291bnRyeS01Nw',
    text: 'Curaçao'
  },
  {
    value: 'VjEtQ291bnRyeS01OA',
    text: 'Cyprus'
  },
  {
    value: 'VjEtQ291bnRyeS01OQ',
    text: 'Czech Republic'
  },
  {
    value: 'VjEtQ291bnRyeS01NA',
    text: "Côte D'Ivoire"
  },
  {
    value: 'VjEtQ291bnRyeS01MQ',
    text: 'Democratic Republic of the Congo'
  },
  {
    value: 'VjEtQ291bnRyeS02MA',
    text: 'Denmark'
  },
  {
    value: 'VjEtQ291bnRyeS02MQ',
    text: 'Djibouti'
  },
  {
    value: 'VjEtQ291bnRyeS02Mg',
    text: 'Dominica'
  },
  {
    value: 'VjEtQ291bnRyeS02Mw',
    text: 'Dominican Republic'
  },
  {
    value: 'VjEtQ291bnRyeS02NA',
    text: 'Ecuador'
  },
  {
    value: 'VjEtQ291bnRyeS02NQ',
    text: 'Egypt'
  },
  {
    value: 'VjEtQ291bnRyeS02Ng',
    text: 'El Salvador'
  },
  {
    value: 'VjEtQ291bnRyeS02Nw',
    text: 'Equatorial Guinea'
  },
  {
    value: 'VjEtQ291bnRyeS02OA',
    text: 'Eritrea'
  },
  {
    value: 'VjEtQ291bnRyeS02OQ',
    text: 'Estonia'
  },
  {
    value: 'VjEtQ291bnRyeS03MA',
    text: 'Ethiopia'
  },
  {
    value: 'VjEtQ291bnRyeS03MQ',
    text: 'Falkland Islands (Malvinas)'
  },
  {
    value: 'VjEtQ291bnRyeS03Mg',
    text: 'Faroe Islands'
  },
  {
    value: 'VjEtQ291bnRyeS03Mw',
    text: 'Fiji'
  },
  {
    value: 'VjEtQ291bnRyeS03NA',
    text: 'Finland'
  },
  {
    value: 'VjEtQ291bnRyeS03NQ',
    text: 'France'
  },
  {
    value: 'VjEtQ291bnRyeS03Ng',
    text: 'French Guiana'
  },
  {
    value: 'VjEtQ291bnRyeS03Nw',
    text: 'French Polynesia'
  },
  {
    value: 'VjEtQ291bnRyeS03OA',
    text: 'French Southern Territories'
  },
  {
    value: 'VjEtQ291bnRyeS03OQ',
    text: 'Gabon'
  },
  {
    value: 'VjEtQ291bnRyeS04MA',
    text: 'Gambia'
  },
  {
    value: 'VjEtQ291bnRyeS04MQ',
    text: 'Georgia'
  },
  {
    value: 'VjEtQ291bnRyeS04Mg',
    text: 'Germany'
  },
  {
    value: 'VjEtQ291bnRyeS04Mw',
    text: 'Ghana'
  },
  {
    value: 'VjEtQ291bnRyeS04NA',
    text: 'Gibraltar'
  },
  {
    value: 'VjEtQ291bnRyeS04NQ',
    text: 'Greece'
  },
  {
    value: 'VjEtQ291bnRyeS04Ng',
    text: 'Greenland'
  },
  {
    value: 'VjEtQ291bnRyeS04Nw',
    text: 'Grenada'
  },
  {
    value: 'VjEtQ291bnRyeS04OA',
    text: 'Guadeloupe'
  },
  {
    value: 'VjEtQ291bnRyeS04OQ',
    text: 'Guam'
  },
  {
    value: 'VjEtQ291bnRyeS05MA',
    text: 'Guatemala'
  },
  {
    value: 'VjEtQ291bnRyeS05MQ',
    text: 'Guernsey'
  },
  {
    value: 'VjEtQ291bnRyeS05Mg',
    text: 'Guinea'
  },
  {
    value: 'VjEtQ291bnRyeS05Mw',
    text: 'Guinea-Bissau'
  },
  {
    value: 'VjEtQ291bnRyeS05NA',
    text: 'Guyana'
  },
  {
    value: 'VjEtQ291bnRyeS05NQ',
    text: 'Haiti'
  },
  {
    value: 'VjEtQ291bnRyeS05Ng',
    text: 'Heard Island and Mcdonald Islands'
  },
  {
    value: 'VjEtQ291bnRyeS05Nw',
    text: 'Holy See (Vatican City State)'
  },
  {
    value: 'VjEtQ291bnRyeS05OA',
    text: 'Honduras'
  },
  {
    value: 'VjEtQ291bnRyeS05OQ',
    text: 'Hong Kong'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDA',
    text: 'Hungary'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDE',
    text: 'Iceland'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDI',
    text: 'India'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDM',
    text: 'Indonesia'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDQ',
    text: 'Iran'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDU',
    text: 'Iraq'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDY',
    text: 'Ireland'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDc',
    text: 'Isle of Man'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDg',
    text: 'Israel'
  },
  {
    value: 'VjEtQ291bnRyeS0xMDk',
    text: 'Italy'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTA',
    text: 'Jamaica'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTE',
    text: 'Japan'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTI',
    text: 'Jersey'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTM',
    text: 'Jordan'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTQ',
    text: 'Kazakhstan'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTU',
    text: 'Kenya'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTY',
    text: 'Kiribati'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDg',
    text: 'Kosovo'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTk',
    text: 'Kuwait'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjA',
    text: 'Kyrgyzstan'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjE',
    text: 'Laos'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjI',
    text: 'Latvia'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjM',
    text: 'Lebanon'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjQ',
    text: 'Lesotho'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjU',
    text: 'Liberia'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjY',
    text: 'Libyan Arab Jamahiriya'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjc',
    text: 'Liechtenstein'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjg',
    text: 'Lithuania'
  },
  {
    value: 'VjEtQ291bnRyeS0xMjk',
    text: 'Luxembourg'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzA',
    text: 'Macao'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzE',
    text: 'Macedonia'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzI',
    text: 'Madagascar'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzM',
    text: 'Malawi'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzQ',
    text: 'Malaysia'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzU',
    text: 'Maldives'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzY',
    text: 'Mali'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzc',
    text: 'Malta'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzg',
    text: 'Marshall Islands'
  },
  {
    value: 'VjEtQ291bnRyeS0xMzk',
    text: 'Martinique'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDA',
    text: 'Mauritania'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDE',
    text: 'Mauritius'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDI',
    text: 'Mayotte'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDM',
    text: 'Mexico'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDQ',
    text: 'Micronesia'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDU',
    text: 'Moldova'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDY',
    text: 'Monaco'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDc',
    text: 'Mongolia'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDg',
    text: 'Montenegro'
  },
  {
    value: 'VjEtQ291bnRyeS0xNDk',
    text: 'Montserrat'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTA',
    text: 'Morocco'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTE',
    text: 'Mozambique'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTI',
    text: 'Myanmar'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTM',
    text: 'Namibia'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTQ',
    text: 'Nauru'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTU',
    text: 'Nepal'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTY',
    text: 'Netherlands'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTc',
    text: 'New Caledonia'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTg',
    text: 'New Zealand'
  },
  {
    value: 'VjEtQ291bnRyeS0xNTk',
    text: 'Nicaragua'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjA',
    text: 'Niger'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjE',
    text: 'Nigeria'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjI',
    text: 'Niue'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjM',
    text: 'Norfolk Island'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTc',
    text: 'North Korea'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjQ',
    text: 'Northern Mariana Islands'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjU',
    text: 'Norway'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjY',
    text: 'Oman'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjc',
    text: 'Pakistan'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjg',
    text: 'Palau'
  },
  {
    value: 'VjEtQ291bnRyeS0xNjk',
    text: 'Palestine'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzA',
    text: 'Panama'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzE',
    text: 'Papua New Guinea'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzI',
    text: 'Paraguay'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzM',
    text: 'Peru'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzQ',
    text: 'Philippines'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzU',
    text: 'Pitcairn'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzY',
    text: 'Poland'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzc',
    text: 'Portugal'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzg',
    text: 'Puerto Rico'
  },
  {
    value: 'VjEtQ291bnRyeS0xNzk',
    text: 'Qatar'
  },
  {
    value: 'VjEtQ291bnRyeS01MA',
    text: 'Republic of the Congo'
  },
  {
    value: 'VjEtQ291bnRyeS0xODE',
    text: 'Romania'
  },
  {
    value: 'VjEtQ291bnRyeS0xODI',
    text: 'Russia'
  },
  {
    value: 'VjEtQ291bnRyeS0xODM',
    text: 'Rwanda'
  },
  {
    value: 'VjEtQ291bnRyeS0xODA',
    text: 'Réunion'
  },
  {
    value: 'VjEtQ291bnRyeS0xODQ',
    text: 'Saint Barthélemy'
  },
  {
    value: 'VjEtQ291bnRyeS0xODU',
    text: 'Saint Helena, Ascension and Tristan Da Cunha'
  },
  {
    value: 'VjEtQ291bnRyeS0xODY',
    text: 'Saint Kitts and Nevis'
  },
  {
    value: 'VjEtQ291bnRyeS0xODc',
    text: 'Saint Lucia'
  },
  {
    value: 'VjEtQ291bnRyeS0xODg',
    text: 'Saint Martin (French Part)'
  },
  {
    value: 'VjEtQ291bnRyeS0xODk',
    text: 'Saint Pierre and Miquelon'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTA',
    text: 'Saint Vincent and the Grenadines'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTE',
    text: 'Samoa'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTI',
    text: 'San Marino'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTM',
    text: 'Sao Tome and Principe'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTQ',
    text: 'Saudi Arabia'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTU',
    text: 'Senegal'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTY',
    text: 'Serbia'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTc',
    text: 'Seychelles'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTg',
    text: 'Sierra Leone'
  },
  {
    value: 'VjEtQ291bnRyeS0xOTk',
    text: 'Singapore'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDA',
    text: 'Sint Maarten (Dutch Part)'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDE',
    text: 'Slovakia'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDI',
    text: 'Slovenia'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDM',
    text: 'Solomon Islands'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDQ',
    text: 'Somalia'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDU',
    text: 'South Africa'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDY',
    text: 'South Georgia and the South Sandwich Islands'
  },
  {
    value: 'VjEtQ291bnRyeS0xMTg',
    text: 'South Korea'
  },
  {
    value: 'VjEtQ291bnRyeS05MDI1MA',
    text: 'South Sudan'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDc',
    text: 'Spain'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDg',
    text: 'Sri Lanka'
  },
  {
    value: 'VjEtQ291bnRyeS0yMDk',
    text: 'Sudan'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTA',
    text: 'Suriname'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTE',
    text: 'Svalbard and Jan Mayen'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTI',
    text: 'Swaziland'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTM',
    text: 'Sweden'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTQ',
    text: 'Switzerland'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTU',
    text: 'Syria'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTY',
    text: 'Taiwan'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTc',
    text: 'Tajikistan'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTg',
    text: 'Tanzania'
  },
  {
    value: 'VjEtQ291bnRyeS0yMTk',
    text: 'Thailand'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjA',
    text: 'Timor-Leste'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjE',
    text: 'Togo'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjI',
    text: 'Tokelau'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjM',
    text: 'Tonga'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjQ',
    text: 'Trinidad and Tobago'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjU',
    text: 'Tunisia'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjY',
    text: 'Turkey'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjc',
    text: 'Turkmenistan'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjg',
    text: 'Turks and Caicos Islands'
  },
  {
    value: 'VjEtQ291bnRyeS0yMjk',
    text: 'Tuvalu'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzA',
    text: 'Uganda'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzE',
    text: 'Ukraine'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzI',
    text: 'United Arab Emirates'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzM',
    text: 'United Kingdom'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzQ',
    text: 'United States'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzU',
    text: 'United States Minor Outlying Islands'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzY',
    text: 'Uruguay'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzc',
    text: 'Uzbekistan'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzg',
    text: 'Vanuatu'
  },
  {
    value: 'VjEtQ291bnRyeS0yMzk',
    text: 'Venezuela'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDA',
    text: 'Vietnam'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDE',
    text: 'Virgin Islands, British'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDI',
    text: 'Virgin Islands, U.S.'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDM',
    text: 'Wallis and Futuna'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDQ',
    text: 'Western Sahara'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDU',
    text: 'Yemen'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDY',
    text: 'Zambia'
  },
  {
    value: 'VjEtQ291bnRyeS0yNDc',
    text: 'Zimbabwe'
  },
  {
    value: 'VjEtQ291bnRyeS0x',
    text: 'Åland Islands'
  }
]

export default Example
