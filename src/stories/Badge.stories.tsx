import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '../../components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['ai-generated'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story    = { args: { children: 'Pronto', variant: 'default' } }
export const Secondary: Story  = { args: { children: 'Rascunho', variant: 'secondary' } }
export const Outline: Story    = { args: { children: 'PRO', variant: 'outline' } }
export const Destructive: Story = { args: { children: 'Expirado', variant: 'destructive' } }

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-background">
      <Badge variant="default">Pronto</Badge>
      <Badge variant="secondary">Rascunho</Badge>
      <Badge variant="secondary">A4</Badge>
      <Badge variant="secondary">Retrato</Badge>
      <Badge variant="outline">PRO</Badge>
      <Badge variant="outline">1 foto</Badge>
      <Badge variant="outline">Colagem</Badge>
      <Badge variant="destructive">Trial expirado</Badge>
    </div>
  ),
}
