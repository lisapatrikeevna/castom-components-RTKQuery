import { memo, SVGProps } from "react";

const PlayIcon = (props: SVGProps<SVGSVGElement> & {colorFill?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace='preserve' width={24} height={24} fill='none' {...props}>
  <g fill={props.colorFill ? props.colorFill : "#000"} clipPath="url(#a)">
    <path d="M8 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 8 1.333Zm0 12A5.333 5.333 0 1 1 8 2.668a5.333 5.333 0 0 1 0 10.665Z" />
    <path d="M8.227 4.967a1.133 1.133 0 0 0-1.234-.2 1.067 1.067 0 0 0-.666.986v4.494a1.067 1.067 0 0 0 .666.986c.145.066.302.1.46.1a1.16 1.16 0 0 0 .774-.3l2.44-2.246a1.068 1.068 0 0 0 0-1.574l-2.44-2.246Zm-.56 4.766V6.267L9.54 8 7.667 9.733Z" />
  </g>
  <defs>
    <clipPath id="a">
      <path fill={props.colorFill ? props.colorFill : "#000"} d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
  {/*  <path*/}
  {/*    fill="#000"*/}
  {/*    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Z"*/}
  {/*  />*/}
  {/*  <path*/}
  {/*    fill="#000"*/}
  {/*    d="M12.34 7.45a1.7 1.7 0 0 0-1.85-.3 1.6 1.6 0 0 0-1 1.48v6.74a1.6 1.6 0 0 0 1 1.48c.217.098.452.15.69.15a1.74 1.74 0 0 0 1.16-.45L16 13.18a1.6 1.6 0 0 0 0-2.36l-3.66-3.37Zm-.84 7.15V9.4l2.81 2.6-2.81 2.6Z"*/}
  {/*  />*/}

  </svg>)
const Memo = memo(PlayIcon)

export default Memo