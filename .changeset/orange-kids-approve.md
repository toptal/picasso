---
'@toptal/picasso': minor
'@toptal/picasso-charts': minor
'@toptal/picasso-lab': minor
'@topkit/analytics-charts': minor
---

Removed static `data-testid` values and replaced them with dynamic ones, which
means that now you should manually provide values for them.

##### Autocomplete

`picasso/src/Autocomplete/Autocomplete.tsx`

Has 2 new dynamic `data-testid`s for `Input` and `InputAdornment`. To add
custom `data-testid`s user should set values for `testIds.input` or
`testIds.InputAdornment`. For example:

```jsx
<Autocomplete
  testIds={{ input: 'custom-name-1', loadingAdornment: 'custom-name-2' }}
  {...props}
/>
```

##### PageAutocomplete

`picasso/src/PageAutocomplete/PageAutocomplete.tsx`

Has 2 new dynamic `data-testid`s like `Autocomplete` does.

##### Menu

`picasso/src/Menu/Menu.tsx`

Has 1 new dynamic `data-testid` for `MenuItem`. To add custom `data-testid`
user should set value for `testIds.menuItem`. For example:

```jsx
<Menu testIds={{ menuItem: 'custom-name-1' }} {...props} />
```

##### BarChart

`picasso-charts/src/BarChart/BarChart.tsx`

Has 1 new dynamic `data-testid` for `Tooltip`. To add custom `data-testitd`
user should set value for `testIds.tooltip`. For example:

```jsx
<BarChart testIds={{ tooltip: 'custom-name-1' }} {...props} />
```

##### DatePicker

`picasso-lab/src/DatePicker/DatePicker.tsx`

Has 2 new dynamic `data-testid`s for `Input` and `Calendar`. To add custom
`data-testid` user should set values for `testIds.input` or `testIds.calendar`.
For example:

```jsx
<DatePicker
  testIds={{ input: 'custom-name-1', calendar: 'custom-name-2' }}
  {...props}
/>
```

##### Accordion

`picasso/src/Accordion/Accordion.tsx`

Has 2 new dynamic `data-testid`s for `EmptyAccordionSummary` and
`AccordionSummary`. To add custom `data-testid`s user shold set values for
`testIds.emptyAccordionSummary` or `testIds.accordionSummary`. For example:

```jsx
<Accordion
  testIds={{
    emptyAccordionSummary: 'custom-name-1',
    calendar: 'custom-name-2'
  }}
  {...props}
/>
```

##### FileListItem

`picasso/src/FileListItem/FileListItem.tsx`

Has 1 new dynamic `data-testid` for `ProgressBar`. To add custom `data-testid`
user should set value for `testIds.progressBar`. For example:

```jsx
<FileListItem testIds={{ progressBar: 'custom-name-1' }} {...props} />
```

##### OutlinedInput

`picasso/src/OutlinedInput/OutlinedInput.tsx`

Has 1 new dynamic `data-testid` for `InputAdornment`. To add custom
`data-testid` user should set value for `testIds.resetButton`. For example:

```jsx
<OutlinedInput testIds={{ resetButton: 'custom-name-1' }} {...props} />
```

##### Input

`picasso/src/Input/Input.tsx`

Has 2 new dynamic `data-testid`s for `InputAdornment` and for `OutlinedInput`
component's child component - `InputAdornment`. To add custom `data-testid`
user should set values for `testIds.inputAdornment` or `testIds.resetButton`.
For example:

```jsx
<Input
  testIds={{ inputAdornment: 'custom-name-1', resetButton: 'custom-name-2' }}
  {...props}
/>
```

##### CategoriesChartTooltip

`topkit-analytics-charts/src/CategoriesChartTooltip/CategoriesChartTooltip.tsx`

Has 1 new dynamic `data-testid` for `Paper`. To add custom `data-testid` user
should set value for `testIds.paper`. For example:

```jsx
<CategoriesChartTooltip testIds={{ paper: 'custom-name-1' }} {...props} />
```
