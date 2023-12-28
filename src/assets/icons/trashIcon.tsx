import { memo, SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement> & { colorFill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace='preserve' width={24} height={24}  fill='none' {...props}>
    <path fill={props.colorFill ? props.colorFill : "#000"}
          d="M20.05 11H3.95a.95.95 0 0 0-.95.95v.1c0 .525.425.95.95.95h16.1a.95.95 0 0 0 .95-.95v-.1a.95.95 0 0 0-.95-.95ZM20.05 16H3.95a.95.95 0 0 0-.95.95v.1c0 .525.425.95.95.95h16.1a.95.95 0 0 0 .95-.95v-.1a.95.95 0 0 0-.95-.95ZM20.05 6H3.95a.95.95 0 0 0-.95.95v.1c0 .525.425.95.95.95h16.1a.95.95 0 0 0 .95-.95v-.1a.95.95 0 0 0-.95-.95Z"
    />

  </svg>
)
    const Memo = memo(MenuIcon)

    export default Memo