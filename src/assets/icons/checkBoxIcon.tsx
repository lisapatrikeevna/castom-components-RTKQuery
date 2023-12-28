import { SVGProps, memo } from 'react'
const CheckBoxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path d={'M4 6h16v12H4z'} fill={'#000'} />
    <path
      d={
        'M19 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const Memo = memo(CheckBoxIcon)

export default Memo
