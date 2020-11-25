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
  <Tag>...</Tag>
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

</div>
