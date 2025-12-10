import { SVGProps } from "react";
const CreditCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M3.227 15.63 15.605 3.25m2.371 7.418-2.122 2.122m-1.811 1.79-.945.944"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M3.063 15.575a3.87 3.87 0 0 1 0-5.473l7.039-7.039a3.87 3.87 0 0 1 5.473 0l4.52 4.52a3.87 3.87 0 0 1 0 5.473l-7.04 7.039a3.87 3.87 0 0 1-5.472 0l-4.52-4.52Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M3.86 21.228h15.438"
    />
  </svg>
);
export default CreditCardIcon;
