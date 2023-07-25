import type {ThemeColor} from '@/theme.config'

export const gettingStarted = {
  sections: [
    {
      name: 'Introduction',
      slug: '/docs/ui/introduction'
    },
    {
      name: 'Installation',
      slug: '/docs/ui/installation'
    },
    {
      name: 'Composition',
      slug: '/docs/ui/composition'
    }
  ]
}

export const ui = {
  sections: [
    {
      name: 'Primitives',
      description: 'Building blocks of InterUnit',
      color: 'orange' as ThemeColor,
      sections: [
        {
          name: 'Overview',
          slug: '/primitives',
          color: 'orange' as ThemeColor
        },
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
      color: 'blue' as ThemeColor,
      sections: [
        {
          name: 'Overview',
          slug: '/primitives',
          color: 'orange' as ThemeColor
        },
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
        },
        {
          name: 'Modal',
          slug: '/composites/modal',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Collapsible',
          slug: '/composites/collapsible',
          color: 'blue' as ThemeColor
        }
      ]
    }
  ]
}
