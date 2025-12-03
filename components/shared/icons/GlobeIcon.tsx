import { SVGProps } from "react"
const GlobeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
      stroke="black"
      strokeWidth={1.5}
    />
    <path
      d="M16 24C16 36 24 44 24 44C24 44 32 36 32 24C32 12 24 4 24 4C24 4 16 12 16 24Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M42 30H6"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42 18H6"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default GlobeIcon
