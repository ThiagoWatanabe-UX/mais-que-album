import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TrialBanner } from '../../components/paywall/TrialBanner'

const meta: Meta<typeof TrialBanner> = {
  title: 'Produto/TrialBanner',
  component: TrialBanner,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof TrialBanner>

export const ManyDaysLeft: Story = {
  args: { daysLeft: 12 },
}

export const FewDaysLeft: Story = {
  args: { daysLeft: 2 },
}

export const LastDay: Story = {
  args: { daysLeft: 1 },
}

export const Expired: Story = {
  args: { daysLeft: 0 },
}
