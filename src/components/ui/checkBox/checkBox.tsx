import { ElementRef, forwardRef } from 'react'

import { CheckBoxIcon } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as Checkbox from '@radix-ui/react-checkbox'
import cx from 'clsx'

import s from './checkBox.module.scss'
type CheckBoxProps = {
  checked?: boolean
  className?: string
  label?: string
  onCheckedChange?: () => void
}
export const CheckBox = forwardRef<ElementRef<typeof Checkbox.Root>, CheckBoxProps>(
  ({ checked, className, label, onCheckedChange, ...rest }, ref) => {
    return (
      <div className={s.box}>
        <div className={s.checkBoxWrapper}>
          <Checkbox.Root
            className={cx(s.checkboxRoot, className)}
            ref={ref}
            {...rest}
            checked={checked}
            onCheckedChange={onCheckedChange}
          >
            <Checkbox.Indicator>
              <CheckBoxIcon className={s.iconCheckBox} />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
        <Typography className={s.label} variant={'body2'}>
          {label}
        </Typography>
      </div>
    )
  }
)
