import type { Meta, StoryObj } from '@storybook/react'
import { TabSwitcher, TabSwitcherBtnType } from './'
import { useState } from "react";
import { buttonsVariantType } from "@/components/ui/button";


const meta = {
  argTypes: {
    buttonsVariant:{
      control:{type:'radio'},
      // options:buttonsVariantType
      options:['primary' , 'secondary' , 'tertiary' , 'link']
    },
    title:{
      control: {type:'text'}
    }
  },
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const Comp = (args) => {
  const [tabSwitcherValue, setTabSwitcherValue] = useState('all')
  const tabSwitcherHandler = (dataBtn: TabSwitcherBtnType) => setTabSwitcherValue(dataBtn.value)

  return <TabSwitcher  buttonsData = {args.buttonsData} title = {'Show packs cards'} onChange = {tabSwitcherHandler} activeBtn = {tabSwitcherValue} />
}

export const Default: Story = {
  render: Comp,
  args: {
    buttonsData: [{name: 'My Cards', value: 'me'}, {name: 'All Cards', value: 'all'}],
    variant:'average',
    buttonsVariant:'secondary',
  },
}