import type { Meta, StoryObj } from '@storybook/react'
import Header from "@/components/ui/header/header.tsx";
// import logoImg

const meta = {
  tags: ['autodocs'],
  title: 'Components/Header',
  argTypes: {
    buttonsVariant:{
      control: { type: 'radio' },
      options: ['primary' | 'secondary' | 'tertiary'],
    }
  },
  component: Header,

} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // logoImg: <logoImg/>,
    children: 'Primary Button',
  },
}


