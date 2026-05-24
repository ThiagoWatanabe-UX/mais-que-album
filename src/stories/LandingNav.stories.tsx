import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LandingNav } from '../../components/landing/LandingNav'

const meta: Meta<typeof LandingNav> = {
  title: 'Landing/Nav',
  component: LandingNav,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
}
export default meta

type Story = StoryObj<typeof LandingNav>
export const OnDarkBackground: Story = {}
