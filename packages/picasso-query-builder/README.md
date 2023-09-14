# React Query Builder

Toptal wrapper for [React Query Builder](react-querybuilder.js.org).

Query Builder implementation provides possibility to use variety of searching rules
in order to improve searching experience by complex Dynamic Queries generation.

This library allows to:

- build complex queries based on provided data
- add custom components or operators
- create nested queries
- enhance user experience

This library works by providing a user interface for constructing queries
on the client-side. Generated query can be serialized into a format suitable
for sending it to the backend.

## Components

This module exposes following top-level component.

1. `Query Builder` - the Query Builder itself. Currently it is used in
   `FiltersContent` with QB props that can be passed to it by adding `queryBuilderProps`
   prop to `Filters` component. It is also can be used outside of the Filters
   if needed.

   Here are props that are accepted by QB:

   - `fields` - array of fields to build a query. Each filed is an object with a
   list of properties
   - `query` - a set of rules which will be used to fetch data, a combinator
   and a query id
   - `onQueryChange` - a function that is called when the user makes a change
   to the query in the UI
   - `onValidationChange` - s a function that is called when validation status changes.
   Receives a boolean argument `isValid`
   - `onQueryReset` - a function that is called when QB resets to its default state
   - `maxGroupDepth` - a limit for depth of nested rule groups in QB.
   By default is set to 3.
   - `getOperators` - a function that returns an array of operator objects
   that could be used to construct queries.
   - `onSubmit` -  a function that is called when the user submits
   a query constructed in the QB.
   This function takes a single argument - constructed query.
   - `customValueEditor` - a component that allows possibility to customize
   value editor that is used in QB. By default QB provides default
   set of editors (text inputs, dropdowns, etc.).
   - `customValidator` - a function that allows customized validation
   for the user input in the QB. It helps to provide some custom validation
   rules to enforce specific constraints. Receives a query as an argument
   which represents the full query constructed by the user, including
   any rules and logical operators.
   - `loading` - loading state.
   - `hideControls` - the possibility to display, or not, any of the controls.
   For example "Add rule" or "Add group" control.
   - `enableDragAndDrop` -  the possibility to enable, or not, drag-and-drop functionality.
   This possibility applies to rules and groups to rearrange it within QB.
   - `resetOnFieldChange` - the possibility to reset, or not, operator and
   value fields when the user changes the field selection for a rule.
   - `totalCount` - the total number of results, usually used by other components
   that may need to know the total number of results.
   - `totalCountLoading` - the possibility to display a loading indicator
  or message to the user while the total count is being fetched.

  Besides props QB uses some components that helps with customization and
  better adaptability of initial library to our needs.
  For example:
  
- `AddGroupButton`, `AddRuleButton`, `ClearQueryButton`, `CloneGroupButton`,
   `CloneRuleButton`, `RemoveGroupButton`, `RemoveRuleButton`, `RunQueryButton` -
   customized buttons that are used in QB.

- `AutoComplete`, `MultiSelect`, `RangeInput`, `Select`, `TextInput` - customized
   fields that are used in ValueEditor.

- `CombinatorSelector` - component that determines logical operators to
   combine multiple query conditions

- `FieldSelector` - component that provides dropdown or list of available fields
   from which users can choose.

- `OperatorSelector` - component that allows to define type of comperision
   or operation to be performed on the selected field within a query condition.
   It determines how the field value will be evaluated or matched against
   the specified criteria.

- `ValueEditor` - component that is used to provide access to customized fields.

- `ValidationErrors` - component that provides validation errors.

- `PicassoContext` - context provider that is used as a wrapper to QB and provides
   all needed data.

## Utilities

Besides listed components in order to use QueryBuilder correctly aslo
was created some services in order to handle or use particular
parts of QB or its Fields.

## Confluence Documentation

Please see the
[dedicated Confluence page](https://toptal-core.atlassian.net/wiki/spaces/CP/pages/3021930643/Search+Improvements+Query+Builder)
for details.
