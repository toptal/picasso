# @toptal/picasso-query-builder

[![Picasso NPM package](https://img.shields.io/npm/v/@toptal/picasso-charts?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso-query-builder)

This package combines easy-to-use API of [React Query Builder](react-querybuilder.js.org) with the amazing UX of Picasso.

Query Builder implementation provides possibility to use variety of searching rules
in order to improve searching experience by complex Dynamic Queries generation.

This library allows to:

- build complex queries based on provided data
- add custom components or operators
- create nested queries
- enhance user experience

This library works by providing a user interface for constructing queries
on the client-side. The generated queries can be serialized into a format suitable
for sending it to the backend.

## Prerequisites

The following peer dependencies are required:

- `@toptal/picasso`

## Setup

- `yarn add @toptal/picasso-query-builder`

## Documentation

Documentation and demos are available at [picasso.toptal.net](https://picasso.toptal.net/).

## Components

This module exposes following top-level component.

`<QueryBuilder />` - the Query Builder itself. 

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

- `ControlElementsContext` - context provider that is used as a wrapper to QB and provides
   all needed data.

---
