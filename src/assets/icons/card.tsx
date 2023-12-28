import { SVGProps, memo } from 'react'
export const Card = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={558} width={426} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <g filter={'url(#a)'}>
      <path
        d={'M3 5c0-1.1.9-2 2-2h416a2 2 0 0 1 2 2v548a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z'}
        fill={'#171717'}
      />
      <path
        d={
          'M3.5 5c0-.83.67-1.5 1.5-1.5h416c.83 0 1.5.67 1.5 1.5v548c0 .83-.67 1.5-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V5Z'
        }
        stroke={'#313131'}
      />
    </g>
    <defs>
      <filter
        colorInterpolationFilters={'sRGB'}
        filterUnits={'userSpaceOnUse'}
        height={558}
        id={'a'}
        width={426}
        x={0}
        y={0}
      >
        <feFlood floodOpacity={0} result={'BackgroundImageFix'} />
        <feColorMatrix
          in={'SourceAlpha'}
          result={'hardAlpha'}
          values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
        />
        <feOffset dx={-1} dy={-1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2={'hardAlpha'} operator={'out'} />
        <feColorMatrix values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'} />
        <feBlend in2={'BackgroundImageFix'} result={'effect1_dropShadow_5918_1955'} />
        <feColorMatrix
          in={'SourceAlpha'}
          result={'hardAlpha'}
          values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
        />
        <feOffset dx={1} dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2={'hardAlpha'} operator={'out'} />
        <feColorMatrix values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'} />
        <feBlend in2={'effect1_dropShadow_5918_1955'} result={'effect2_dropShadow_5918_1955'} />
        <feBlend in={'SourceGraphic'} in2={'effect2_dropShadow_5918_1955'} result={'shape'} />
      </filter>
    </defs>
  </svg>
)
const Memo = memo(Card)

export default Memo
