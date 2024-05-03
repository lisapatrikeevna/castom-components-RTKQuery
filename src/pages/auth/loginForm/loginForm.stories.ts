import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  title: 'Auth/LoginForm', component: LoginForm, tags: ['autodocs'],
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Average: Story = {
  // args: {
  //   variant: 'average', buttonsName: ['Primary Button', 'nex btn']
  // },
}


