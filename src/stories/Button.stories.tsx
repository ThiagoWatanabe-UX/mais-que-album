import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '../../components/ui/button'
import { Plus, Trash2, ArrowRight, Upload } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['ai-generated'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default','outline','ghost','secondary','destructive','link'],
    },
    size: {
      control: 'select',
      options: ['default','sm','lg','icon'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Criar álbum', variant: 'default' },
}

export const Outline: Story = {
  args: { children: 'Cancelar', variant: 'outline' },
}

export const Ghost: Story = {
  args: { children: 'Voltar', variant: 'ghost' },
}

export const Destructive: Story = {
  args: { children: 'Remover', variant: 'destructive' },
}

export const WithIconLeft: Story = {
  args: { children: <><Plus className="w-4 h-4" /> Novo álbum</> },
}

export const WithIconRight: Story = {
  args: { children: <>Começar grátis <ArrowRight className="w-4 h-4" /></> },
}

export const IconOnly: Story = {
  args: { size: 'icon', variant: 'ghost', children: <Trash2 className="w-4 h-4" /> },
}

export const Loading: Story = {
  args: { children: 'Enviando...', disabled: true },
  render: (args) => (
    <Button {...args}>
      <Upload className="w-4 h-4 animate-pulse" />
      Enviando...
    </Button>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

/* CSS check — garante que a cor primária está aplicada */
export const CssCheck: Story = {
  args: { children: 'CSS Check', variant: 'default' },
}
