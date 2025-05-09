/* eslint-disable max-lines */
import React, { useState } from 'react'
import type { Field, OptionGroup } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Accordion, Container } from '@toptal/picasso'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'firstName',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'lastName',
      operator: 'beginsWith',
      valueSource: 'value',
      value: 'Doe',
    },
    {
      field: 'instrument',
      operator: '=',
      valueSource: 'value',
      value: 'Steelpan',
    },
    {
      rules: [
        {
          field: 'alsoPlays',
          operator: 'contains',
          valueSource: 'value',
          value: 'More cowbell,Clapstick,Cowbell',
        },
        {
          field: 'groupedField1',
          operator: '=',
          valueSource: 'field',
          value: 'groupedField2',
        },
      ],
      combinator: 'and',
      not: false,
    },
  ],
  combinator: 'and',
}

const musicalInstruments: OptionGroup[] = [
  {
    label: 'Percussion instruments',
    instruments: [
      'Clapstick',
      'Cowbell',
      'Cymbal',
      'Gong',
      'Maraca',
      'Marimba',
      'More cowbell',
      'Spoon',
      'Steelpan',
      'Tambourine',
      'Triangle',
      'Vibraphone',
      'Washboard',
      'Wood block',
      'Wooden fish',
      'Xylophone',
    ],
  },
  {
    label: 'Membranophones',
    instruments: [
      'Barrel drum',
      'Bass drum',
      'Bongo drums',
      'Conga',
      'Drum',
      'Drum kit',
      "Jew's harp",
      'Octaban',
      'Samphor',
      'Snare drum',
      'Timpani',
      'Tom-tom',
    ],
  },
  {
    label: 'Wind instruments',
    instruments: [
      'Accordion',
      'Air horn',
      'Bagpipe',
      'Baritone horn',
      'Bassoon',
      'Bazooka',
      'Beatboxing',
      'Blown bottle',
      'Bugle',
      'Clarinet',
      'Conch',
      'Cornet',
      'Didgeridoo',
      'Double bell euphonium',
      'Doulophone',
      'English horn',
      'Euphonium',
      'Flugelhorn',
      'Flute',
      'French horn',
      'Harmonica',
      'Irish flute',
      'Jug',
      'Kazoo',
      'Melodeon',
      'Mezzo-soprano',
      'Oboe',
      'Ocarina',
      'Pan flute',
      'Piccolo',
      'Pipe organ',
      'Recorder',
      'Saxophone',
      'Slide whistle',
      'Sousaphone',
      'Trombone',
      'Trumpet',
      'Tuba',
      'Whistle',
    ],
  },
  {
    label: 'Stringed instruments',
    instruments: [
      'Aeolian harp',
      'Bandolin',
      'Banjo ukulele',
      'Cello',
      'Chapman stick',
      'Clavichord',
      'Clavinet',
      'Double bass',
      'Dulcimer',
      'Fiddle',
      'Guitar',
      'Hammered dulcimer',
      'Harp',
      'Harpsichord',
      'Lute',
      'Lyre',
      'Maguhu',
      'Mandola',
      'Mandolin',
      'Octobass',
      'Piano',
      'Sitar',
      'Ukulele',
      'Viol',
      'Violin',
      'Washtub bass',
    ],
  },
  {
    label: 'Electronic instruments',
    instruments: [
      'AlphaSphere',
      'Audiocubes',
      'Bass pedals',
      'Continuum Fingerboard',
      'Croix Sonore',
      "Denis d'or",
      'Dubreq stylophone',
      'Drum machine',
      'Eigenharp',
      'Electric guitar',
      'Electronic keyboard',
      'Electronic organ',
      'EWI',
      'Fingerboard synthesizer',
      'Hammond organ',
      'Keyboard',
      'Keytar',
      'Kraakdoos',
      'Laser harp',
      'Mellotron',
      'MIDI keyboard',
      'Omnichord',
      'Ondes Martenot',
      'Otamatone',
      'Sampler',
      'Seaboard music instrument',
      'Skoog',
      'Synclavier',
      'Synthesizer',
      'Teleharmonium',
      'Tenori-on',
      'Theremin',
      'trautonium',
      'Turntablism',
      'Turntable',
    ],
  },
].map(({ label, instruments }) => ({
  label,
  options: instruments.map(instrument => ({
    name: instrument,
    label: instrument,
  })),
}))

const fields: Field[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
  },
  {
    name: 'boolfield',
    label: 'Boolean Field',
    valueEditorType: 'boolean',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    defaultOperator: 'beginsWith',
  },
  { name: 'age', label: 'Age', inputType: 'number' },
  {
    name: 'instrument',
    label: 'Primary instrument',
    valueEditorType: 'select',
    values: musicalInstruments,
    defaultValue: 'Cowbell',
  },
  {
    name: 'alsoPlays',
    label: 'Also plays',
    valueEditorType: 'multiselect',
    values: musicalInstruments,
    defaultValue: 'More cowbell',
  },
  { name: 'height', label: 'Height', inputType: 'number' },
  { name: 'job', label: 'Job', inputType: 'text' },
  {
    name: 'groupedField1',
    label: 'Grouped Field 1',
    comparator: 'group',
    group: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'groupedField2',
    label: 'Grouped Field 2',
    comparator: 'group',
    group: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'groupedField3',
    label: 'Grouped Field 3',
    comparator: 'group',
    group: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'groupedField4',
    label: 'Grouped Field 4',
    comparator: 'group',
    group: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'rangeInput',
    label: 'Some Range',
    valueEditorType: 'range',
    icon: '$',
    min: 0,
    step: 10,
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
      />
      <Container top='medium'>
        <Accordion content={<pre>{JSON.stringify(query, null, 2) + '\n'}</pre>}>
          <Accordion.Summary>Query</Accordion.Summary>
        </Accordion>
      </Container>
    </>
  )
}

export default Example
