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
      name: 'Components',
      description:
        'Components are the building blocks of your application. They are the smallest unit of UI that you can compose together to create a user interface.',
      color: 'blue' as ThemeColor,
      slug: '/',
      sections: [
        {
          name: 'Primitives',
          slug: '/docs/primitives',
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
          name: 'Collapsible',
          slug: '/collapsible',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Combobox',
          slug: '/combobox',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Form',
          slug: '/form',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Modal',
          slug: '/modal',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Popover',
          slug: '/popover',
          color: 'blue' as ThemeColor
        },
        {
          name: 'Tabs',
          slug: '/tabs',
          color: 'blue' as ThemeColor
        }
      ]
    }
  ]
}
