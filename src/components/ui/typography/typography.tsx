import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import cx from 'clsx'

import s from './typography.module.scss'

export const TypographyVariant = [
  'body1',
  'body2',
  'caption',
  'h1',
  'h2',
  'h3',
  'large',
  'link1',
  'link2',
  'overline',
  'span',
  'subtitle1',
  'subtitle2',
] as const

export type TypographyProps<T extends ElementType = 'h3'> = {
  as?: T
  children: ReactNode
  variant?: (typeof TypographyVariant)[number]
} & ComponentPropsWithoutRef<T>
export const Typography = <T extends ElementType = 'h3'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { as: Component = 'h3', children, className, variant = 'h3', ...rest } = props

  return (
    <Component className={cx(s[variant], className)} {...rest}>
      {children}
    </Component>
  )
}
