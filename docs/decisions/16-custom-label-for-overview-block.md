# Custom label for OverviewBlock

## Problem

The current version of the [OverviewBlock](http://localhost:9001/?path=/story/components-overviewblock--overviewblock) does not allow us to add a custom label, with custom styles or custom implementation, the current version does not allow us even to add custom styles for it.

## Proposal

Introduce the label as a `ReactNode` type.
This will allow us to wrap the label into a `Tooltip`, but not only it, but we will also be able to add custom styles with `Typography` or wrap it with a `Container` to have a custom implementation.
It will allow the extraction of the logic of `label` and give more freedom of implementation.

## Research data

You can find a POC with the custom label implemented in [this commit](https://github.com/toptal/picasso/commit/401a5cb7ef66478f534707e064643477a1f0c2e6).
