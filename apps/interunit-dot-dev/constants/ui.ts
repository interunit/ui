
export const ui = {
  name: 'UI',
  slug: 'ui',
  sections: [
    {
      name: 'Primitives',
      description: 'Building blocks of InterUnit',
      slug: 'primitives',
      sections: [
        {
          name: 'Text',
          slug: 'text'
        },
        {
          name: 'Box',
          slug: 'box'
        },
        {
          name: 'Button',
          slug: 'button'
        }
      ]
    },
    {
      name: 'Composites',
      description:
        'Components that are made up of other composites and primitves',
      slug: 'composites',
      sections: [
        {
          name: 'Popover',
          slug: 'popover'
        },
        {
          name: 'Combobox',
          slug: 'combobox'
        }
      ]
    }
  ]
}
