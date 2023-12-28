import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery } from '@/services/base-api'
import { useEffect } from "react";


type propsType={
  currentPage:number
  minCardsCount:number
  maxCardsCount:number
  name:string
}
//refetch-обновить данные, новый запрос
export const Decks = ({currentPage,minCardsCount,maxCardsCount,name}:propsType) => {
  const { data,error,refetch } = useGetDecksQuery({ currentPage ,minCardsCount,maxCardsCount,name})
  const { data: deckByIdData } = useGetDeckByIdQuery({ id: 'clpuyvj1o01y0ry2xjr6yeuny' })
  const [createDeck, { isLoading: is }] = useCreateDeckMutation()

  useEffect(()=>{},[])

if( error ){
  return <h2>{error.data.message}</h2>
  // return <h2>{JSON.stringify(error)}</h2>
}

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Updated</TableHeadCell>
            <TableHeadCell>Author</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map(el => {
            return (
              <TableRow key={el.id}>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.cardsCount}</TableCell>
                <TableCell>{new Date(el.updated).toLocaleDateString()}</TableCell>
                <TableCell>{el.author.name}</TableCell>
                <TableCell>btn</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
