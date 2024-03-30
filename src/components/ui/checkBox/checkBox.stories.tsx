import { CheckBox } from '@/components/ui/checkBox/checkBox'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    checked: {
      control: { type: 'radio' },
      options: ['checked', 'unchecked'],
    },
  },
  component: CheckBox,
  tags: ['autodocs'],
  title: 'Components/CheckBox',
} satisfies Meta<typeof CheckBox>

export default meta

type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: true,
  },
}
export const Unchecked: Story = {
  args: {
    checked: false,
  },
}
export const CheckBoxDefault: Story = {
  render: (args: any) => {
    return <CheckBox {...args} label={'CheckBox'} />
  },
}
