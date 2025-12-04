import { SVGProps } from "react"
const LockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 11V9.66669"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M2.84651 12.5631C2.99643 13.6767 3.91872 14.549 5.04108 14.6006C5.98548 14.644 6.94484 14.6667 8.00131 14.6667C9.05777 14.6667 10.0171 14.644 10.9615 14.6006C12.0839 14.549 13.0062 13.6767 13.1561 12.5631C13.2539 11.8365 13.3346 11.0917 13.3346 10.3333C13.3346 9.57493 13.2539 8.8302 13.1561 8.10353C13.0062 6.99 12.0839 6.11766 10.9615 6.06606C10.0171 6.02265 9.05777 6 8.00131 6C6.94484 6 5.98548 6.02265 5.04108 6.06606C3.91872 6.11766 2.99643 6.99 2.84651 8.10353C2.74867 8.8302 2.66797 9.57493 2.66797 10.3333C2.66797 11.0917 2.74867 11.8365 2.84651 12.5631Z"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <path
      d="M5 5.99998V4.33331C5 2.67646 6.34315 1.33331 8 1.33331C9.65687 1.33331 11 2.67646 11 4.33331V5.99998"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default LockIcon
