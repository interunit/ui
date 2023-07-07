import {ThemeColor} from '@/theme.config'

export const ui = {
  sections: [
    {
      name: 'Primitives',
      description: 'Building blocks of InterUnit',
      slug: '/primitives',
      color: 'orange' as ThemeColor,
      sections: [
        {
          name: 'Text',
          slug: '/primitives/text',
          color: 'orange' as ThemeColor
        },
        {
          name: 'Box',
          slug: '/primitives/box',
          color: 'orange' as ThemeColor
        },
        {
          name: 'Button',
          slug: '/primitives/button',
          color: 'orange' as ThemeColor
        }
      ]
    },
    {
      name: 'Composites',
      description:
        'Components that are made up of other composites and primitves',
      slug: '/composites',
      color: 'blue' as ThemeColor,
      sections: [
        {
          name: 'Popover',
          slug: '/composites/popover',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Form',
          slug: '/composites/form',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Combobox',
          slug: '/composites/combobox',
          color: 'blue' as ThemeColor
        }
      ]
    }
  ]
}
