import PicassoBook from '~/.storybook/components/PicassoBook'

const mergingClassesPage = PicassoBook.section('Tutorials').createPage(
  'Merging classes',
  'How to merge classes with respect of Picasso TailwindCSS theme'
)

mergingClassesPage.createChapter().addTextSection(`
## picasso-tailwind-merge

\`@toptal/picasso-tailwind-merge\` is a package with tools that should be used for merging and joining classes

It contains:  
* \`twMerge\`
* \`twJoin\` 
## twMerge

\`twMerge\` can correctly merge classes from TailwindCSS default theme. 
However Picasso is using extended theme. That is why \`twMerge\` from \`@toptal/picasso-tailwind-merge\`
should be used instead of \`twMerge\` from \`tailwind-merge\` package
Just import \`twMerge\` from \`@toptal/picasso-tailwind-merge\` and use it as regular \`twMerge\`. 
No additional configurations required.

Documentation for original \`twMerge\` placed [here](https://github.com/dcastil/tailwind-merge/blob/v2.3.0/docs/README.md).

## twJoin

\`twJoin\` is also included in \`@toptal/picasso-tailwind-merge\`.
`)
