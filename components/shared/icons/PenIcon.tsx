import { type SVGProps } from "react";

export const PenIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <g stroke="currentColor" strokeLinejoin="round">
        <path d="m10.953 3.07.66-.66a1.4 1.4 0 0 1 1.98 1.98l-.66.66m-1.98-1.98-4.44 4.44a2.64 2.64 0 0 0-.694 1.226l-.483 1.93 1.93-.482a2.64 2.64 0 0 0 1.227-.694l4.44-4.44m-1.98-1.98 1.98 1.98" />
        <path
          d="M12.667 9c0 2.191 0 3.287-.606 4.025q-.166.202-.37.37C10.955 14 9.859 14 7.668 14h-.334c-2.514 0-3.77 0-4.552-.781S2 11.18 2 8.666v-.333c0-2.192 0-3.287.605-4.025q.167-.203.37-.37c.738-.605 1.833-.605 4.025-.605"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
