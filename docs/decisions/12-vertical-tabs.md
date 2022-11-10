# Vertical Tabs

- [Design](https://www.figma.com/file/5SCTOPrCDcHuk5We091GBn/Product-Library)
- [Proof of Concept](https://picasso.toptal.net/fx-3220-vertical-tabs/?path=/story/layout-tabs--tabs#vertical-with-users)

## Problem

It is possible to implement required design with current implementation with small style adjustments, but, as you can see below in the example, the implementation becomes messy and it does not feel like a great developer experience

```jsx
<Tabs value={value} onChange={handleChange} orientation='horizontal/vertical'>
  <Tabs.Tab
    label={
      <UserBadge
        renderName={(name: string) => (
          <TypographyOverflow variant='heading' size='small' inline>
            {name}
          </TypographyOverflow>
        )}
        name='Name'
        avatar='avatar path'
      >
        <Typography size='xsmall'>position</Typography>
      </UserBadge>
    }
    {...rest}
  />
</Tabs>
```

## Proposal

Reuse current `Tabs.Tab` component and conditionally render different components for horizontal and vertical orientation.

```jsx
<Tabs value={value} onChange={handleChange} orientation='horizontal/vertical'>
  <Tabs.Tab
    label='Jacqueline Roque'
    image='./jacqueline-with-flowers-1954-square.jpg'
    description='UI specialist'
  />
</Tabs>
```

### Drawbacks and limitations

- ads small complexity to `Tabs.Tab`, conditional rendering

## Alternatives

### Storybook example

Prepare an example in the storybook and users can copy the solution. Such example can be seen in the [Proof of Concept](https://picasso.toptal.net/fx-3220-vertical-tabs/?path=/story/layout-tabs--tabs#vertical-with-users))

### Export new components

Prepare new subcomponent

```jsx
<Tabs value={value} onChange={handleChange} orientation='horizontal/vertical'>
  <Tabs.UserItem
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
    position='UI specialist'
  />
</Tabs>
```

## Decision

We decided to go with reusing `Tabs.Tab` since it will bring supreme developer experience
