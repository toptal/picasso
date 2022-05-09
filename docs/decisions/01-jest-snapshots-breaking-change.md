## Problem

We release a new version of Picasso with changed jest snapshots, however, Picasso users don't need to take any actions to support those changes except updating snapshots. Do we want to treat this as a breaking change?

## Proposal

Not to treat such changes as a breaking change.

## Alternatives

Treat such changes as breaking change.

## Decision

We do not treat change in jest snapshots as a breaking change.
Almost all changes in Picasso update jest snapshots, that's why we decided to not treat such changes as breaking changes.
