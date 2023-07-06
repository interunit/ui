import {Theme} from '../styled-components.config'

export const ui = {
  sections: [
    {
      name: 'Primitives',
      description: 'Building blocks of InterUnit',
      slug: '/primitives',
      color: Theme.color.accent.orange,
      sections: [
        {
          name: 'Text',
          slug: '/primitives/text',
          color: Theme.color.accent.orange
        },
        {
          name: 'Box',
          slug: '/primitives/box',
          color: Theme.color.accent.orange
        },
        {
          name: 'Button',
          slug: '/primitives/button',
          color: Theme.color.accent.orange
        }
      ]
    },
    {
      name: 'Composites',
      description:
        'Components that are made up of other composites and primitves',
      slug: '/composites',
      color: Theme.color.accent.blue,
      sections: [
        {
          name: 'Popover',
          slug: '/composites/popover',
          color: Theme.color.accent.blue
        },
        {
            name: 'Form',
            slug: '/composites/form',
            color: Theme.color.accent.blue
        },
        {
          name: 'Combobox',
          slug: '/composites/combobox',
          color: Theme.color.accent.blue
        },
      ]
    }
  ]
}
