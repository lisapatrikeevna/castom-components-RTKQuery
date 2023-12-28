import s from './desksPage.module.scss'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabSwitcher } from "@/components/ui/tabSwitcher";
import { Slider } from "@/components/ui/slider";
import { TrashIcon } from "@/assets";
import { Decks } from "@/pages/decks.tsx";
import { useEffect, useState } from "react";

const DesksPage = () => {
  const [sliderValue, setSliderValue] = useState([0, 100])
  const [currentPage, setCurrentPage] = useState(4)
  const [searchValue, setSearchValue] = useState('')

  useEffect(()=>{setCurrentPage(1)},[sliderValue])
  const clearFilterHandler=()=>{
    setCurrentPage(1)
    setSliderValue([0,100])
    setSearchValue('')
  }
const searchValueHandler=(e:any)=>{
  setSearchValue(e.currentTarget.value)
}
const clearInputHandler = () => {
  setSearchValue('')
}

  return (<div className={s.container}>
    <div className={`${s.flexBox}  ${s.pageHeader}`}>

      {/*<Typography as={'h2'} className={s.pageTitle}>Packs list</Typography>*/}
      <h2 className={s.pageTitle}>Packs list</h2>
      <Button fullWidth={false} className={s.btn} onClick={clearFilterHandler}>Add New Pack</Button>

    </div>
    <div className={`${s.flexBox} ${s.filterWrap}`}>

      <Input placeholder={'Input search'} type={'search'} className={s.search} onChange={searchValueHandler} value={searchValue} clearInput={clearInputHandler}/ >
      <TabSwitcher buttonsName={['My Cards', 'All Cards']} title={'Show packs cards'} className={s.tabSwitcherWrap}/>
      <div className={s.wrapSlider}>
        <h4>Number of cards</h4>
        <Slider setSliderValue={setSliderValue} sliderValue={sliderValue}/>
      </div>
      <Button className={s.clierFilterBtn}><TrashIcon colorFill={'#fff'} />Clear Filter</Button>

    </div>

    <Decks currentPage={currentPage} minCardsCount={sliderValue[0]} maxCardsCount={sliderValue[1]} name={searchValue}/>

  </div>)
};

export default DesksPage;