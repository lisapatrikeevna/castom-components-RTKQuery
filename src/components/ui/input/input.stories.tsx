import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Input } from './'

const meta = {
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['default', 'password', 'search', 'error'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input',
  },
}
export const Password: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input',
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    label: 'Search',
    placeholder: 'Input',
    type: 'search',
  },
  render: () => {
    const [value, setValue] = useState('')

    return (
      <Input
        clearInput={() => setValue('')}
        onChange={e => setValue(e.currentTarget.value)}
        type={'search'}
        value={value}
      />
    )
  },
}
export const Error: Story = {
  args: {
    error: 'Error!',
    label: 'Input',
    placeholder: 'Error',
  },
}
