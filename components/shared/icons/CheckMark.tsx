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
