import type { Meta, StoryObj } from '@storybook/react'

import { Typography, TypographyVariant } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: TypographyVariant,
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    children: 'Story H1',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children: 'Story H2',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children: 'Story H3',
    variant: 'h3',
  },
}
