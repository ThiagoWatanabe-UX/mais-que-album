import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LandingPricing } from '../../components/landing/LandingPricing'

const meta: Meta<typeof LandingPricing> = {
  title: 'Landing/Pricing',
  component: LandingPricing,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LandingPricing>
export const Default: Story = {}
