# Visual tests placing

## Problem

Following the [Single Visual Tests tool](./04-single-visual-tests-tool.md) decision, it should be clarified which tests belong to Storybook and which belong to Cypress Component Testing.

## Goal

There is a clear separation and distinction between Cypress and Storybook visual tests.

## Proposal

Storybook visual tests:
- are screenshots comparisons for Storybook stories
- do not interact with the DOM before taking the screenshot
- do not duplicate added Cypress visual tests

Cypress visual tests:
- exist as a result of an interaction
- they only validate the visual state of a component, not its data handling
- do not duplicate the existing Storybook stories screenshots

Choosing a place for a screenshot, when overlapping happens:
- when adding an interaction in Cypress also duplicates a Storybook visual test, Storybook test should be disabled
- if a test is particularly flaky in Storybook, it should be migrated to Cypress for stability, where there is more control
