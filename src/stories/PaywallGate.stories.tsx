import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PaywallGate } from '../../components/paywall/PaywallGate'
import { Button } from '../../components/ui/button'

const meta: Meta<typeof PaywallGate> = {
  title: 'Produto/PaywallGate',
  component: PaywallGate,
  tags: ['ai-generated'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof PaywallGate>

export const Blocked: Story = {
  args: {
    hasAccess: false,
    feature: 'criar mais álbuns',
    children: <Button>Criar álbum</Button>,
  },
}

export const WithAccess: Story = {
  args: {
    hasAccess: true,
    feature: 'criar mais álbuns',
    children: <Button>Criar álbum</Button>,
  },
}
