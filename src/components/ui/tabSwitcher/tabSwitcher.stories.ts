import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  title: 'Components/TabSwitcher', component: TabSwitcher, tags: ['autodocs'], argTypes: {
    variant: {
      options: ['light', 'average', 'dark'], control: {type: 'radio'},
    }, buttonsVariant: {
      options: ['primary', 'secondary', 'tertiary', 'link'], control: {type: 'radio'},
    }, buttonsName: {
      control: {type: 'text'}
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Average: Story = {
  args: {
    variant: 'average', buttonsName: ['Primary Button', 'nex btn']
  },
}
export const Dark: Story = {
  args: {
    variant: 'dark', buttonsName: ['Button', 'nex btn']
  },
}

