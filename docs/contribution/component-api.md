This document is constructed in the form of Q&A, search for your case on the list or add your case in the format of question and answer otherwise.

## Glossary

_compound component_ - a react pattern that assumes building the desired component from the predefined blocks, which are usually available as static props on the main component. Blocks may share the state implicitly and communicate in the background

_facade_ - a pattern that assumes one react component available for the consumer with access to the internal props

_content props_ - props that provide content for the component

_universal component_ - a component that suppports both _compound_ and regular way of usage

## Practical cases

#### Q: Should I choose a _compound component_ or _facade_ pattern for my NewComponent?

#### A: Check how many _content props_ you have. For 2+ _content props_ create a universal component, for 1 _content prop_ use facade.

Example:

```
// Universal

const ModalTitle = ({ children }) => (
  <div style={{ borderBottom: "1px solid gray", padding: "15px 0" }}>
    {children}
  </div>
);
const ModalContent = ({ children }) => (
  <div style={{ margin: "30px 0" }}>{children}</div>
);
const ModalActions = ({ children }) => (
  <div style={{ borderTop: "1px solid gray", padding: "15px 0" }}>
    {children}
  </div>
);
const ModalRoot = ({ children }) => (
  <div style={{ background: "white", padding: "30px" }}>{children}</div>
);

const Modal = ({ title, content, actions, children }) => {
  return (
    <ModalRoot>
      {children ?? (
        <>
          <ModalTitle>{title}</ModalTitle>
          <ModalContent>{content}</ModalContent>
          <ModalActions>{actions}</ModalActions>
        </>
      )}
    </ModalRoot>
  );
};

Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default function App() {
  return (
    <div className="App">
      {/* Facade */}
      <Modal
        title="hello"
        content="content"
        actions={
          <>
            <button>Save</button>
            <button>Cancel</button>
          </>
        }
      />

      {/* Compound */}
      <Modal>
        <Modal.Title>Title</Modal.Title>
        <Modal.Content>Content</Modal.Content>
        <Modal.Actions>Actions</Modal.Actions>
      </Modal>
    </div>
  );
```

#### Q: What if my component should have a different size?
#### A: Use a size prop with an enum of limited values.

Example:
```
size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
```

#### Q: How should I name my prop?
#### A: Use native equivalent if possible. Otherwise, check the codebase for the property with similar functionality.

Example:
```
<Button disabled>Disabled</Button>
```

#### Q: Should I use boolean or enum for my prop?
#### A: Imagine or investigate how many different values of this prop is possible to have.

Example:
```
<Alert danger /> // boolean. renders red box
<Alert warning /> // boolean. renders yellow box

<Alert warning danger /> // bad. which color should win?
<Alert variant='danger' /> // good
```
