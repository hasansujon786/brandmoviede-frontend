import { type SVGProps } from "react";

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <g stroke="currentColor">
        <path d="M14.365 7.363c.203.284.304.426.304.637 0 .21-.101.352-.304.636-.91 1.277-3.236 4.03-6.362 4.03S2.55 9.913 1.64 8.636c-.203-.284-.304-.426-.304-.636s.101-.353.304-.637c.91-1.277 3.236-4.03 6.363-4.03 3.126 0 5.451 2.753 6.362 4.03Z" />
        <path d="M10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
      </g>
    </svg>
  );
};
