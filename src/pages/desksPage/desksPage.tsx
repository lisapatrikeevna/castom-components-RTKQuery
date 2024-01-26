import s from './desksPage.module.scss'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabSwitcher, TabSwitcherBtnType } from "@/components/ui/tabSwitcher";
import { Slider } from "@/components/ui/slider";
import { TrashIcon } from "@/assets";
import { Decks } from "@/pages/desksPage/decks.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "@/services/store.ts";
import Portal from "@/components/ui/portal/portal.tsx";
import AddNewDeckBody from "@/components/addNewDeckBody/addNewDeckBody.tsx";
import { Pagination } from "@/components/ui/pagination/pagination.tsx";
import { useGetDeckByIdQuery, useGetDecksQuery } from "@/services/decks/decks.servies.ts";
import { Typography } from "@/components/ui/typography";



const DesksPage = () => {

  const userId = useSelector<RootStateType, string>(state => state.app.user.id)

  const [sliderValue, setSliderValue] = useState([0, 100])
  const [searchValue, setSearchValue] = useState('')
  const [tabSwitcherValue, setTabSwitcherValue] = useState('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [isOpen, setIsOpen] = useState<boolean|null>(null)
  const selectOptions = ['10', '20', '50', '100']
  const {data: decksData, error} = useGetDecksQuery({currentPage, minCardsCount: sliderValue[0], maxCardsCount: sliderValue[1], name: searchValue, itemsPerPage, ...(tabSwitcherValue !== 'all' ? {authorId: userId} : {})})
  useEffect(() => decksData && setCurrentPage(decksData.pagination.currentPage), [decksData])
  const arrBtnTabSwitcher = [{name: 'My Cards', value: 'me'}, {name: 'All Cards', value: 'all'}]
  useEffect(() => {setCurrentPage(1)}, [sliderValue, searchValue])
  const clearFilterHandler = () => {
    setCurrentPage(1)
    setSliderValue([0, 100])
    clearInputHandler()
  }
  const searchValueHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)
  const clearInputHandler = () => setSearchValue('')
  const tabSwitcherHandler = (dataBtn: TabSwitcherBtnType) => setTabSwitcherValue(dataBtn.value)
  const isOpenHandler = (isOpenValue: boolean) => setIsOpen(isOpenValue)

  // isLoading - первая загрузка, когда нет данных
  // isFetching - обновление данных, например при возвращении на вкладку
  // Иными словами isLoading === true только при изначальной загрузке, а isFetching - при любом запросе
  //
  // При isLoading мы показываем крутилки/скелетоны, при isFetching дизейблим пагинацию, как пример


  return <>

    <div className={`${s.flexBox}  ${s.pageHeader}`}>

      <Typography as={'h2'} className={s.pageTitle}>Packs list</Typography>
      <Portal title={'Add New Deck'} textBtnOpen={'Add New Pack'} portalWrapClass={s.portalWrapClass} isOpen={isOpen} children={<AddNewDeckBody isOpenHandler={isOpenHandler}/>}/>

    </div>
    <div className={`${s.flexBox} ${s.filterWrap}`}>

      <Input placeholder={'Input search'} type={'search'} className={s.search} onChange={searchValueHandler} value={searchValue} clearInput={clearInputHandler}/>
      <TabSwitcher buttonsData={arrBtnTabSwitcher} title={'Show packs cards'} onChange={tabSwitcherHandler} activeBtn={tabSwitcherValue} className={s.tabSwitcherWrap}/>
      <div className={s.wrapSlider}>
        <h4>Number of cards</h4>
        <Slider setSliderValue={setSliderValue} sliderValue={sliderValue}/>
      </div>
      <Button className={s.clierFilterBtn} onClick={clearFilterHandler}><TrashIcon colorFill={'#fff'}/>Clear Filter</Button>

    </div>
    {error && <p>useGetDecksQuery: {error.toString()}</p>}
    {decksData && <Decks userId={userId} items={decksData.items}/>}
    <Pagination currentPage={currentPage} handlePageChange={(pageNumber: number) => setCurrentPage(pageNumber)} handleSetItemsPerPage={(numItemsPerPage: number) => setItemsPerPage(numItemsPerPage)} itemsPerPage={itemsPerPage} selectOptions={selectOptions} totalCount={decksData?.maxCardsCount} totalPages={decksData?.pagination.totalPages}/>
  </>
}

export default DesksPage;