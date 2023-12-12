import {Button} from "@/components/ui/button";

export function App() {


    return <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
        <Button as={'div'}> normal button</Button>
        <Button as={'a'} href={'#'}> links that looks like a button</Button>
        <Button as={'div'}>123</Button>
    </div>
    // return <div>Hello</div>
}