import type { Metadata } from "next";

// Only the homepage is meant to appear in search results; every other route
// opts out. noarchive is repeated here because a page-level `robots` replaces
// the root layout's value instead of merging with it.
export const NO_INDEX: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  noarchive: true,
};
