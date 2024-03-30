import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import cx from 'clsx'

import s from './pagination.module.scss'

import { DOTS, usePagination } from './usePagination'

export type PaginatorPropsType = {
  className?: string
  currentPage: number
  handlePageChange: (pageNumber: number) => void
  handleSetItemsPerPage: (numItemsPerPage: number ) => void
  itemsPerPage: number
  selectOptions?: string[]
  siblingCount?: number
  totalCount: number | undefined
  totalPages: number | undefined
}

export const Pagination = (props: PaginatorPropsType) => {
  const {className, currentPage = 1, handlePageChange, handleSetItemsPerPage,
    itemsPerPage = 10, selectOptions, siblingCount = 1, totalCount = 10,} = props
  const classNames = {
    arrowLeft: cx(s.arrow, s.left),
    arrowRight: cx(s.arrow, s.right),
    paginationContainer: cx(s.paginationContainer, className),
  }

  const paginationRange = usePagination({
    currentPage,
    itemsPerPage,
    siblingCount,
    totalCount,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    handlePageChange(currentPage + 1)
  }

  const onPrevious = () => {
    handlePageChange(currentPage - 1)
  }
  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <>

      <ul className={classNames['paginationContainer']}>
        {/* Left navigation arrow */}
        <li className={cx(s.paginationItem, { [s.disabled]: currentPage === 1 })}
          onClick={onPrevious}
        >
          <div className={classNames['arrowLeft']} />
        </li>
        {paginationRange.map((pageNumber, idx) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li className={s.dots} key={idx}>
                &#8230;
              </li>
            )
          }

          // Render our Page Pills
          return (
            <li className={cx(s.paginationItem, { [s.selected]: pageNumber === currentPage })} key={idx} onClick={() => handlePageChange(Number(pageNumber))}>
              {pageNumber}
            </li>
          )
        })}
        {/*  Right Navigation arrow */}
        <li
          className={cx(s.paginationItem, {
            [s.disabled]: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className={classNames['arrowRight']} />
        </li>
        <li>
          <div className={s.numOfPages}>
            <Typography>Show</Typography>
            <Select className={s.triggerBtn} itemsPerPage={itemsPerPage} onChangeOption={handleSetItemsPerPage} options={selectOptions} placeholder={'10'}/>
            <Typography>per page</Typography>
          </div>
        </li>
      </ul>
    </>
  )
}
