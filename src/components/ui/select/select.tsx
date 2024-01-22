import { ComponentPropsWithoutRef, FC } from 'react'

import ArrowDownIcon from '@/assets/icons/arrowDownIcon'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectProps = {
  className?: string
  itemsPerPage?: number
  onChangeOption?: (value: number ) => void
  options: string[]
  placeholder?: string
  title?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>
export const Select: FC<SelectProps> = ({
  className,
  itemsPerPage,
  onChangeOption,
  options,
  placeholder,
  title,
  ...rest
}) => {
  const mappedOptions = options.map((el, id) => {
    return (
      <SelectRadix.Item className={s.selectItem} key={id} value={el}>
        <SelectRadix.ItemText>{el}</SelectRadix.ItemText>
        <SelectRadix.ItemIndicator className={s.selected}></SelectRadix.ItemIndicator>
      </SelectRadix.Item>
    )
  })

  return (
    <div className={s.box}>
      <div className={s.title}>{title}</div>
      <SelectRadix.Root {...rest}>
        <SelectRadix.Trigger className={s.trigger}>
          <SelectRadix.Value placeholder={options[0]} />
          <SelectRadix.Icon>
            <ArrowDownIcon className={s.iconArrow} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.selectContent} position={'popper'}>
            <SelectRadix.Viewport className={s.selectViewport}>
              <SelectRadix.Group>{mappedOptions}</SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
