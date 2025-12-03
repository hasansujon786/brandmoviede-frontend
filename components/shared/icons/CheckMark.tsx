import { SVGProps } from "react"
const CheckMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5007 2.08301H10.0007C6.2687 2.08301 4.40273 2.08301 3.24335 3.24237C2.08398 4.40175 2.08398 6.26772 2.08398 9.99967C2.08398 13.7316 2.08398 15.5976 3.24335 16.757C4.40273 17.9163 6.2687 17.9163 10.0007 17.9163C13.7326 17.9163 15.5986 17.9163 16.758 16.757C17.9173 15.5976 17.9173 13.7316 17.9173 9.99967V8.33301"
      stroke="#4A4C56"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M7.08398 8.33366L10.0007 11.2503L17.5008 2.91699"
      stroke="#4A4C56"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default CheckMark

export const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_6302_793)">
      <path
        d="M18.3346 9.99996C18.3346 5.39758 14.6036 1.66663 10.0013 1.66663C5.39893 1.66663 1.66797 5.39758 1.66797 9.99996C1.66797 14.6023 5.39893 18.3333 10.0013 18.3333C14.6036 18.3333 18.3346 14.6023 18.3346 9.99996Z"
        stroke="#E9355C"
        strokeWidth={1.5}
      />
      <path
        d="M6.66797 10.625C6.66797 10.625 8.0013 11.3854 8.66797 12.5C8.66797 12.5 10.668 8.12496 13.3346 6.66663"
        stroke="#E9355C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_6302_793">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
)
