import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LandingFeatures } from '../../components/landing/LandingFeatures'

const meta: Meta<typeof LandingFeatures> = {
  title: 'Landing/Features',
  component: LandingFeatures,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LandingFeatures>
export const Default: Story = {}
