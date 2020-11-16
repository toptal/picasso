<div style="max-width: 800px;">

## API Principles

To better understand how Picasso is built and to navigate in
components of the library you should know the principles we follow
when building API for new or existing components.

### Component types

- _Common component_

  Using just the name of the component.

  Example:

  ```
  <Label>...</Label>
  ```

- _Nested component_

  Name of the parent component together with the component name.

  Example:

  ```
  <Page>
    <Page.Content>...</Page.Content>
  </Page>
  ```

  Here `Page.Content` - it's a component `Content` inside `Page`, and always should be nested inside parent `Page` component

- _Multivariant components_

  If one functionality can be represented by the various looks of the component.

  Example:

  ```
  <Button variant='secondary'>...</Button>
  ```

  Here `variant='secondary'` - type of the look and feel of the component.
  
### Props

- Always use `children` for content

  We do always use `children` prop to display the main content of the component (if possible).
  
  Few examples:

  - [`Sidebar.Item`](https://github.com/toptal/picasso/blob/d4b4a9d795dfb031b622528e22e9ac9c61350991/packages/picasso/src/Sidebar/story/Default.example.jsx#L33)
  ```
  <Sidebar.Menu>
    <Sidebar.Item icon={<Overview16 />} selected>
      Overview
    </Sidebar.Item>
    <Sidebar.Item icon={<Jobs16 />}>Jobs</Sidebar.Item>
    ...
  </Sidebar.Menu>
  ```
  
  - [`Accordion`](https://github.com/toptal/picasso/blob/3cf406d308532f3e20fa7b9ef856acc1069d7d2f/packages/picasso/src/Accordion/story/Default.example.jsx#L15)
  ```
  const DetailsDogDefinitionPanel = () =>
    <Accordion.Details>
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
    </Accordion.Details>
  ...
  <Accordion content={<DetailsDogDefinitionPanel />}>
      <Accordion.Summary>What is a dog?</Accordion.Summary>
  </Accordion>
  ```

</div>
