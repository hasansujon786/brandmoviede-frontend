import type { SVGProps } from "react";
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

export const CreditCardExchangeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        d="M2 16c0 2.21 0 3.316.702 4.054q.169.178.37.327C3.908 21 5.16 21 7.667 21h.666c2.506 0 3.759 0 4.595-.62q.201-.147.37-.326C14 19.316 14 18.211 14 16c0-2.21 0-3.316-.702-4.054a3 3 0 0 0-.37-.327C12.092 11 10.84 11 8.333 11h-.666c-2.506 0-3.759 0-4.595.62a3 3 0 0 0-.37.326C2 12.684 2 13.789 2 16m8-8c0-2.21 0-3.316.702-4.054q.168-.178.37-.327C11.908 3 13.16 3 15.667 3h.666c2.506 0 3.759 0 4.595.62q.201.148.37.326C22 4.684 22 5.789 22 8c0 2.21 0 3.316-.702 4.054a3 3 0 0 1-.37.327c-.758.562-1.86.614-3.928.618M2 15h12m-4-8h12M2 9c0-3.317 2.683-6 6-6l-.857 1.714M22 15c0 3.317-2.683 6-6 6l.857-1.714"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
