# `picasso-tailwind-merge`

## Major version update on changes of extended classes

Major version updates should happen each time when object passed to `extendTailwindMerge` in `twMerge.ts` changes. This includes cases when we add or remove a class, rename, etc. 

It should be a major update because the output of `twMerge` is changed in this case. Also, we need to be sure that the version would be updated on a client side. Because if not, classes can be merged incorrectly.
