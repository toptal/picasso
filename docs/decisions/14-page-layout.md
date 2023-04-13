# Page layout

- [Responsiveness discussion channel (#responsive-design)](https://toptal-core.slack.com/archives/C052MRF4QJV)

## Problem

In order to comply with BASE design responsiveness, page layout needs to be modified.

BASE design standardises page layout – the page content (section between header bar and bottom of the page) is expected to have only three possible layouts (please see the [Figma link](https://www.figma.com/file/q2nvjiyO2CLqBv4DeJnU3i/Product-Library-Documentation?node-id=4788%3A37925&t=Qekpwfkixg6Feqpq-1) for more details):

- page content with full sidebar – for screens equal or wider than `1280px`
- page content with compact sidebar – for screens equal or wider than `1280px`
- page content without sidebar (or with sidebar, accessible via hamburger button) – for screens smaller than `1280px`

## Decision

- Sidebar is hidden (and is accessible via hamburger button) on screens narrower than `1280px`
- Sidebar is shown on screens equal or wider than `1280px` and it has two variants – wide and compact
