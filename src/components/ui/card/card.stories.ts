import InfoIcon from "../../../../../flash_cards_2/src/assets/icons/InfoIcon.tsx";
import type { Meta, StoryObj } from '@storybook/react'
import {ReactNode} from "react";

import { Card } from './'

const meta = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['dark' , 'light' , 'white'],
            control: { type: 'radio' },
        },
        title:{
           text:{
               control:{type:'text'},
           },
            iconElement:{
               control:{type:ReactNode}
            },
        },
        width:{
            control:{type:'text'},
        },
    },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {
    args: {
        variant: 'dark',
        children: 'inner text for dark body',
        width: '500px',
    },
}

export const Light: Story = {
    args: {
        variant: 'light',
        title:{text:'light native title'},
        children: 'light dody',
    },
}
export const White: Story = {
    args: {
        variant: 'white',
        children: 'Tertiary Button-body',
    },
}


