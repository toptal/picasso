<div style="max-width: 800px;">

## API Principles

To better understand how Picasso is built and to navigate in
components of the library you should know the principles we follow
when builing API for new or existsing components.


### Component types
- *Common component*

  Using just the name of the component.

  Example:

  ```
  <Label>...</Label>
  ```

- *Nested component*

  Name of the parent component together with the component name.

  Example:
  ```
  <Page>
    <Page.Content>...</Page.Content>
  </Page>
  ```

  Here `Page.Content` - it's a component `Content` inside `Page`, and always should be nested inside parent `Page` component

- *Multivariant components*

  If one functionality can be represented by the various looks of the component.

  Example:
  ```
  <Button variant='secondary-red'>...</Button>
  ```
  
  Here `variant='secondary-red'` - type of the look and feel of the component.

</div>
