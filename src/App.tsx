import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import InfoIcon from "@/assets/InfoIcon.tsx";
import {TabSwitcher} from "@/components/ui/tabSwitcher/tabSwitcher.tsx";

export function App() {
    return <div style={{display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fff', height:'100vh'}}>
        <Button as={'button'}>normal button</Button>
        {/*<Button as={'a'} href={'#'}> links that looks like a button</Button>*/}
        {/*<Button as={'div'}>123</Button>*/}
        {/*<Card title={{text: 'cartTitle', titleIcon: <InfoIcon colorFill={'#fff'}/>}}>some inner text</Card>*/}
        <Card width={'400px'} title={{text:'title text',iconElement:<InfoIcon/>,iconSize:'15px'}}><h1>h1 test</h1><p style={{color: 'red'}}>some inner text</p></Card>
        <TabSwitcher buttonsName={['Switcher0', 'Switcher1']} buttonsVariant={'tertiary'}/>
    </div>
    // return <div>Hello</div>
}