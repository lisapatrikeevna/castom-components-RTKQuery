import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { IconClose, IconEye, IconSearch } from '@/assets'
import { Typography } from '@/components/ui/typography'
import cx from 'clsx'

import s from './input.module.scss'

type InputProps = {
  clearInput?: () => void
  error?: string
  label?: string
} & ComponentPropsWithoutRef<'input'>
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, clearInput, error, label, type = 'text', ...rest }, ref) => {
    const [show, setShow] = useState(false)

    const showPass = () => setShow(!show)
    const showClearButton = type === 'search' && rest?.value?.toString().length! > 0
    const showError = !!error && error.length > 0
    const classInput = cx(s[type], s.input, showError && s.error, className)

    const clearButton = (
      <button className={s.buttonIcon} onClick={clearInput} type={'button'}>
        <IconClose />
      </button>
    )
    const eyeButton = type === 'password' && (
      <button className={s.buttonIcon} onMouseDown={showPass} onMouseUp={showPass} type={'button'}>
        <IconEye />
      </button>
    )

    return (
      <div className={s.box}>
        <Typography as={'label'} className={s.label} variant={'body1'}>
          {type === 'search' ? '' : label}
        </Typography>
        <div className={s.inputBox}>
          {type === 'search' && <IconSearch className={s.searchIcon} />}
          <input className={classInput} type={(show && 'text') || type} {...rest} ref={ref} />
          {showClearButton && clearButton}
          {eyeButton}
        </div>
        {showError && (
          <Typography as={'label'} className={s.error} variant={'caption'}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)
