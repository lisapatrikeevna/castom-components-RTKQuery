import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox } from '@/components/ui/checkBox/checkBox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>

export const ControlledCheckBox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, ref, value },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  return <CheckBox {...rest} checked={value} onCheckedChange={onChange} ref={ref} />
}
