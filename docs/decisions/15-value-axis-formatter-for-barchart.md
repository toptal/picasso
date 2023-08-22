# Value axis formatter for BarChart

## Problem

The current version of the [BarChart](https://picasso.toptal.net/?path=/story/picasso-charts-barchart--barchart) does not allow us to format the value axis, displaying to the user raw values, e.g. `1000`, `10000`, `100000`.

## Proposal

Introduce the optional `valueAxisTickFormatter` parameter to the component, making it possible to pass a formatter function to it.
This will allow us to format the value axis as we need it to be presented to the user, e.g. `$1k`, `$10k`, `$100k`.
The component used by the `BarChart` component (`RechartsBarChart`) already allows this formatter, so, we just need to make it available in picasso and proxy it to `RechartsBarChart`. 

## Research data

You can find a POC with the formatter in [this commit](https://github.com/toptal/picasso/commit/10fa7a087dbd9e7b5ada34bad264635083dcfaae)
