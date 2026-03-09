# QueryBuilder

## Props

### QueryBuilder

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **fields** | `Field[]` | - | Defines array of fields to build a query. Each filed is an object with a list of properties. |
| **query** | `RuleGroupTypeAny` | - | Defines a set of rules which will be used to fetch data, a combinator and a query id. |
| **onQueryChange** | `(newQuery: RuleGroupTypeAny) => void` | - | Defines a function that is called when the user makes a change to the query in the UI. This function receives an updated query as an argument. |
| onValidationChange | `((isValid: boolean) => void)` | - | Defines a function that is called when validation status changes. Receives a boolean argument `isValid` |
| onQueryReset | `(() => void)` | - | Defines a function that is called when QB resets to its default state |
| maxGroupDepth | `number` | `3` | Defines a limit for depth of nested rule groups in QB. By default is set to 3. |
| getOperators | `((fields: Field[], fieldName: string) => Operator<string>[])` | - | Defines a function that returns an array of operator objects that could be used to construct queries. |
| onSubmit | `((query: RuleGroupTypeAny) => void)` | - | Defines a function that is called when the user submits a query constructed in the QB. This function takes a single argument - constructed query. |
| valueEditor | `ValueEditorComponentProps` | `(props: ValEditorProps) => <DefaultValEditor {...props} />` | Defines a component that allows possibility to customize value editor that is used in QB. By default, QB provides default set of editors (text inputs, dropdowns, etc.). |
| loading | `boolean` | `false` | Defines the loading state. |
| padded | `SpacingType` | - | Defines padded layout. |
| hideControls | `boolean` | - | Defines the possibility to display, or not, any of the controls. For example "Clear query" or "Run query" control. |
| enableDragAndDrop | `boolean` | `false` | Defines the possibility to enable, or not, drag-and-drop functionality. This possibility applies to rules and groups to rearrange it within QB. |
| runQueryButtonContent | `ReactNode` | - | Defines custom Run Query button content that allows to change button text or display custom logic. |
| footer | `ReactNode` | - | Adds a customized footer at the bottom of the query builder. |
| header | `ReactNode` | - | Adds a customized header at the top of the query builder. |
| resetOnFieldChange | `boolean` | `true` | Defines the possibility to reset, or not, operator and value fields when the user changes the field selection for a rule. |

### Default

```tsx
import React, { useState } from 'react'
import type { Field, OptionGroup } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Accordion, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const initialQuery = {
  rules: [],
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
    enableResetSearch: true,
    enableReset: true,
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
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const { showSuccess } = useNotifications()

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const handleSubmit = () => {
    showSuccess('Successfully submitted.')
  }

  const testIds = {
    runQueryButton: 'run-query-button',
    addRuleButton: 'add-rule-button',
    addGroupButton: 'add-group-button',
    controls: 'query-builder-controls',
    valueEditor: 'value-editor',
    fieldSelector: 'field-selector',
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSubmit}
        testIds={testIds}
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
```

### Initial Values

```tsx
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
```

### ValueEditor with Async Values

Loading async values for value editors.

```tsx
import React, { useEffect, useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

type MultiSelectOptions = {
  label: string
  name: string
}

const defaultQuery = {
  rules: [],
  combinator: 'and',
}

const multiselectOptions = [
  {
    label: 'Digital Design',
    name: 'DIGITAL_DESIGN',
  },
  {
    label: 'UI',
    name: 'UI',
  },
  {
    label: 'Salesforce',
    name: 'SALESFORCE',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(defaultQuery)
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<MultiSelectOptions[]>()

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true)
      const data = await new Promise<MultiSelectOptions[]>(resolve =>
        setTimeout(() => {
          resolve(multiselectOptions)
          setLoading(false)
        }, 1000)
      )

      setOptions(data)
    }

    loadOptions()
  }, [])

  const fields = [
    {
      name: 'Multiselect',
      label: 'Multiselect',
      valueEditorType: 'multiselect' as const,
      values: options,
      loading: loading,
    },
  ]

  const handleChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder fields={fields} query={query} onQueryChange={handleChange} />
  )
}

export default Example
```

### Drag and Drop

```tsx
import React, { useState } from 'react'
import type { Field, OptionGroup } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

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
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      enableDragAndDrop
    />
  )
}

export default Example
```

### Footer

Customized footer

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Button, Container } from '@toptal/picasso'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '21',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      hideControls
      footer={
        <Container flex justifyContent='space-between'>
          <Button variant='secondary'>Copy url</Button>
          <Container flex justifyContent='flex-end'>
            <Button variant='secondary'>Clear query</Button>
            <Button size='medium' variant='positive'>
              Run query
            </Button>
          </Container>
        </Container>
      }
    />
  )
}

export default Example
```

### Hide Controls

Hide buttons used for query reset and submitting

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { SPACING_0 } from '@toptal/picasso-provider'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '21',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      padded={SPACING_0}
      hideControls
    />
  )
}

export default Example
```

### Header

Customized header

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Button, Container } from '@toptal/picasso'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '21',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      header={
        <Container flex justifyContent='flex-end'>
          <Button size='small' variant='positive'>
            Do something
          </Button>
        </Container>
      }
    />
  )
}

export default Example
```

### Custom Padding

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { SPACING_0 } from '@toptal/picasso-provider'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '21',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      padded={SPACING_0}
      hideControls
    />
  )
}

export default Example
```

### Custom Run Query Button

Example of Customized children for Run query button

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Container } from '@toptal/picasso-container'
import { Loader } from '@toptal/picasso-loader'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '12',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const renderTotalCount = ({
    totalCountLoading,
    totalCount,
  }: {
    totalCountLoading: boolean
    totalCount: number
  }) => {
    if (totalCountLoading) {
      return (
        <Container left='small'>
          <Loader size='small' variant='inherit' />
        </Container>
      )
    }

    return totalCount !== undefined && `(${totalCount})`
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      runQueryButtonContent={
        <>
          Custom Text{' '}
          {renderTotalCount({ totalCount: 15, totalCountLoading: false })}
        </>
      }
    />
  )
}

export default Example
```

### Field Description

Hover over 'First  name' field in the field selector dropdown to display field description in a tooltip

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'field1',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'field2',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'field1',
    label: 'First name',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'field2',
    label: 'Last name',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
    />
  )
}

export default Example
```

### Loading

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '21',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      loading={true}
    />
  )
}

export default Example
```

### Maximum Group Depth

Maximum group depth is set to one

```tsx
import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'john',
    },
    {
      rules: [
        {
          field: 'age',
          operator: '=',
          valueSource: 'value',
          value: '21',
        },
      ],
      combinator: 'and',
      not: false,
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
      maxGroupDepth={1}
    />
  )
}

export default Example
```

### Functional Callbacks

onQueryChange, onValidationChange, onQueryReset

```tsx
import React, { useState } from 'react'
import type {
  RuleType,
  ValidationResult,
  RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { QueryBuilder } from '@toptal/picasso-query-builder'
import { Typography } from '@toptal/picasso'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: '',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '12',
    },
  ],
  combinator: 'and',
}

const checkRequired = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: ['Name is required'],
      valid: false,
    }
  )
}

const checkAge = (rule: RuleType): ValidationResult | boolean => {
  return (
    rule.value >= 18 || {
      reasons: ['Age should be greater or equal to 18'],
      valid: false,
    }
  )
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validator: checkRequired,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validator: checkAge,
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
    console.log('onQueryChange: ', newQuery)
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
    console.log('onValidationChange: ', valid)
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        onValidationChange={handleValidationChange}
        onQueryReset={() => console.log('onQueryReset')}
      />
      <Typography>Is query valid: {isValid.toString()}</Typography>
    </>
  )
}

export default Example
```

### Custom Operators

```tsx
import React, { useState } from 'react'
import type { Field } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  defaultOperators,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import type { DefaultOperator, RuleType } from 'react-querybuilder'
import { Typography } from '@toptal/picasso'

const initialQuery = {
  rules: [],
  combinator: 'and',
}

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
  },
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'height', label: 'Height', inputType: 'number' },
  { name: 'job', label: 'Job' },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const getOperators = (fieldsList: Field[], fieldName: string) => {
    const field = fieldsList.find((item: Field) => item.name === fieldName)

    if (!field) {
      return defaultOperators
    }

    let textOperators: DefaultOperator[] = []

    if (field.inputType === 'number') {
      textOperators.push({ name: '=', label: 'equals' })
    } else if (field.inputType === 'text') {
      textOperators = [
        { name: 'contains', label: 'contains' },
        { name: 'beginsWith', label: 'begins with' },
        { name: 'endsWith', label: 'ends with' },
      ]
    } else {
      return defaultOperators
    }

    return textOperators
  }

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const operatorsString = (input: RuleGroupTypeAny): string[] => {
    return input.rules.flatMap(item => {
      if ((item as RuleGroupTypeAny).rules) {
        return operatorsString(item as RuleGroupTypeAny)
      }

      return [(item as RuleType).operator]
    })
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        getOperators={getOperators}
      />
      {operatorsString(query).map((item, index) => (
        <Typography>
          Field {index} operator: {item}
        </Typography>
      ))}
    </>
  )
}

export default Example
```

### Validation on Rule Level

Providing a validator function on the rule level. Field level validation is working by passing validation function to `validator` field. It simply works by passing `handleValidationChange` function to `onValidationChange` prop in QB.
    In this example, the validation checks if the Name input has been filled and Age input is greater or equal to 18 and the query is not empty.
    In order to see validation errors click on `Add rule` button and run query without filling in Name input and Fill in Age input with wrong value ( < 18).

```tsx
import React, { useState } from 'react'
import type { RuleType, ValidationResult } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Typography } from '@toptal/picasso'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: '',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '12',
    },
  ],
  combinator: 'and',
}

const checkRequired = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: ['Name is required'],
      valid: false,
    }
  )
}

const checkAge = (rule: RuleType): ValidationResult | boolean => {
  return (
    rule.value >= 18 || {
      reasons: ['Age should be greater or equal to 18'],
      valid: false,
    }
  )
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validator: checkRequired,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validator: checkAge,
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        onValidationChange={handleValidationChange}
      />
      <Typography>Is query valid: {isValid.toString()}</Typography>
    </>
  )
}

export default Example
```

### Custom Value Editor

We can create CustomValueEditor component and pass it to QB props.

    In this component we are checking inputType of the field and based on it we can return some Custom Value Editor. In this case only for text inputs we are returning Custom Editor and for the rest we return an Input.

```tsx
import React, { useState } from 'react'
import type {
  RuleGroupTypeAny,
  ValueEditorProps,
} from '@toptal/picasso-query-builder'
import { QueryBuilder } from '@toptal/picasso-query-builder'
import { Input, Select } from '@toptal/picasso'

const initialQuery = {
  rules: [],
  combinator: 'and',
}

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
  },
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'height', label: 'Height', inputType: 'number' },
]

const options = [
  { label: 'Select Option 1', value: '1', text: 'Custom Option 1' },
  { label: 'Select Option 2', value: '2', text: 'Custom Option 2' },
  { label: 'Select Option 3', value: '3', text: 'Custom Option 3' },
]

const CustomValueEditor = (props: ValueEditorProps) => {
  const [selectedOption, setSelectedOption] = useState(props.value)

  const handleOptionChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: string }>
  ) => {
    const newValue = event.target.value

    setSelectedOption(newValue)
    props.handleOnChange(newValue)
  }

  if (props.inputType === 'text') {
    return (
      <Select
        options={options}
        name='Custom Value Editor'
        value={selectedOption}
        onChange={handleOptionChange}
        placeholder='Custom Value Editor'
      />
    )
  }

  return <Input placeholder='Default Value Editor' />
}

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      query={query}
      onQueryChange={handleQueryChange}
      fields={fields}
      valueEditor={CustomValueEditor}
    />
  )
}

export default Example
```
