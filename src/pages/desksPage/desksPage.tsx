import s from './desksPage.module.scss'
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabSwitcher } from "@/components/ui/tabSwitcher";
import { Slider } from "@/components/ui/slider";
import { TrashIcon } from "@/assets";
import { Decks } from "@/pages /decks.tsx";

const DesksPage = () => {
  const slederValue = [2, 10]

  return (<div className={s.container}>
    <div className={`${s.flexBox}  ${s.pageHeader}`}>

      {/*<Typography as={'h2'} className={s.pageTitle}>Packs list</Typography>*/}
      <h2 className={s.pageTitle}>Packs list</h2>
      <Button fullWidth={false} className={s.btn}>Add New Pack</Button>

    </div>
    <div className={`${s.flexBox} ${s.filterWrap}`}>

      <Input placeholder={'Input search'} type={'search'} className={s.search}/>
      <TabSwitcher buttonsName={['My Cards', 'All Cards']} title={'Show packs cards'} className={s.tabSwitcherWrap}/>
      <div>
        <h4>Number of cards</h4>
        <Slider value={slederValue}/>
      </div>
      <Button className={s.clierFilterBtn}><TrashIcon colorFill={'#fff'} />Clear Filter</Button>

    </div>

    <Decks/>

  </div>);
};

export default DesksPage;