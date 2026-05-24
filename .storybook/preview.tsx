import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream',    value: '#FFF8F5' },
        { name: 'dark',     value: '#080305' },
        { name: 'white',    value: '#ffffff' },
      ],
    },
    a11y: { test: 'todo' },
  },
}

export default preview
