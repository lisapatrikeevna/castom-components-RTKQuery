import { ComponentPropsWithoutRef, FC } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {
  setSliderValue: (newValues: number[]) => void
  sliderValue?: number[]
} & ComponentPropsWithoutRef<typeof SliderRadix.Root>
export const Slider: FC<SliderProps> = ({ setSliderValue, sliderValue, value, ...rest }) => {
  const onHandlerChange = (newValues: number[]) => {
    setSliderValue(newValues)
  }

  return (
    <form>
      <div className={s.boxSlider}>
        <div className={s.boxNumber}>{sliderValue?.[0]}</div>
        <SliderRadix.Root
          className={s.sliderRoot}
          minStepsBetweenThumbs={10}
          onValueChange={onHandlerChange}
          step={1}
          value={sliderValue}
          {...rest}
        >
          <SliderRadix.Track className={s.sliderTrack}>
            <SliderRadix.Range className={s.sliderRange} />
          </SliderRadix.Track>
          <SliderRadix.Thumb aria-label={'Volume'} className={s.sliderThumb} />
          <SliderRadix.Thumb aria-label={'Volume'} className={s.sliderThumb} />
        </SliderRadix.Root>
        <div className={s.boxNumber}>{sliderValue?.[1]}</div>
      </div>
    </form>
  )
}
