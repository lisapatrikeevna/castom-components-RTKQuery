import { SVGProps, memo } from 'react'
const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M5.51 9.46a1 1 0 0 1 1.64-.77l5.36 4.48 5.37-4.32A1 1 0 0 1 19.3 9a1 1 0 0 1-.15 1.46l-6 4.83a1 1 0 0 1-1.27 0l-6-5a1 1 0 0 1-.36-.83Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const Memo = memo(ArrowDownIcon)

export default Memo
