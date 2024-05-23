import PicassoBook from '~/.storybook/components/PicassoBook'

const mergingClassesPage = PicassoBook.section('Tutorials').createPage(
  'Merging classes',
  'How to merge classes with respect of Picasso TailwindCSS theme'
)

mergingClassesPage.createChapter().addTextSection(
  // prettier-ignore
  '## picasso-tailwind-merge\n' +

    '`@toptal/picasso-tailwind-merge` is a package with tools that should be used for merging and joining classes.\n' +
    
    '\n' +

    'It contains:\n' +  
      '* `twMerge`\n' +
      '* `twJoin`\n' + 

  '## twMerge\n' +

    '`twMerge` can correctly merge classes from TailwindCSS default theme. ' +
    'However Picasso is using extended theme. That is why `twMerge` from `@toptal/picasso-tailwind-merge`' +
    'should be used instead of `twMerge` from `tailwind-merge` package.\n' + 

    '\n'+
  
    'Just import `twMerge` from `@toptal/picasso-tailwind-merge` and use it as regular `twMerge`.' + 
    'No additional configurations required.\n' + 

    `\n` +

    'Documentation for original `twMerge` placed [here](https://github.com/dcastil/tailwind-merge/blob/v2.3.0/docs/README.md).\n' +

  '## twJoin\n' +

    '`twJoin` is also included in `@toptal/picasso-tailwind-merge`.'
)
