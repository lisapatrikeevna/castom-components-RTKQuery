import type { Meta, StoryObj } from '@storybook/react'
import { Card } from "@/components/ui/card/card.tsx";
import EditIcon from "@/assets/icons/editIcon.tsx";

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
        title:{text:'light native from title'},
        children: <>'light dody from children' <EditIcon/></>,
        width: '600px',
    },
}
export const White: Story = {
    args: {
        variant: 'white',
        title:{text:'white native from title' ,iconElement:<EditIcon/>},
        // title:{text:'white native from title' ,iconElement:<IconEye fill={'#000'} />},
        children: 'Tertiary Button-body',
        width: '700px',
    },
}


