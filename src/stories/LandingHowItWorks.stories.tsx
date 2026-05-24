import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LandingHowItWorks } from '../../components/landing/LandingHowItWorks'

const meta: Meta<typeof LandingHowItWorks> = {
  title: 'Landing/HowItWorks',
  component: LandingHowItWorks,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LandingHowItWorks>
export const Default: Story = {}
