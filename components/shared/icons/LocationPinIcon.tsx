import { SVGProps } from "react";
const LocationPinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 6.33337C10 7.43797 9.1046 8.33337 8 8.33337C6.8954 8.33337 6 7.43797 6 6.33337C6 5.22881 6.8954 4.33337 8 4.33337C9.1046 4.33337 10 5.22881 10 6.33337Z"
      stroke="currentColor"
    />
    <path
      d="M8 1.33337C10.7059 1.33337 13 3.61873 13 6.39131C13 9.20804 10.6685 11.1847 8.515 12.5288C8.35807 12.6192 8.1806 12.6667 8 12.6667C7.8194 12.6667 7.64193 12.6192 7.485 12.5288C5.3355 11.1716 3 9.21777 3 6.39131C3 3.61873 5.29413 1.33337 8 1.33337Z"
      stroke="currentColor"
    />
    <path
      d="M12 13.3334C12 14.0698 10.2091 14.6667 8 14.6667C5.79086 14.6667 4 14.0698 4 13.3334"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);
export default LocationPinIcon;
